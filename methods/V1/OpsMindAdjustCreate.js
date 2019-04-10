'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var fibers = require("fibers")
var _ = require("underscore")
var util = require('util')
var moment = require("moment")
var mysql = require(API_PATH + "/kernel/MySql")
var req = require(API_PATH + "/kernel/Request")
var _db = new mysql(config.mysql)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var policy_id = self.input.PolicyId
        var category = self.input.CateGory
        var silence = self.input.Silence
        var desc = self.input.Desc
        var scope = self.input.Scope
        var trigger_name = self.input.TriggerName
        var trigger_operator = self.input.TriggerOperator
        var trigger_level = self.input.TriggerLevel
        var trigger_threshold = self.input.TriggerThreshold
        var trigger_for = self.input.TriggerFor
        var trigger_nodata_for = self.input.TriggerNoDataFor
        var trigger_notes = self.input.TriggerNotes


        //validation
        if (!this.checkParams(['PolicyId','CateGory','Silence','Scope','TriggerName','TriggerOperator','TriggerThreshold','TriggerLevel','TriggerFor','TriggerNoDataFor'])) {
            return;
        }

        /*计算Hash ID*/
        var hash_id = Func.sha1(category + policy_id + JSON.stringify(scope) + trigger_name + trigger_operator + trigger_level + trigger_threshold + trigger_for)


        /*判断Adjuest是否存在*/
        var adjust_exist = _db.select('*', 'adjust', {
            'hashid': hash_id
        })

        if (adjust_exist.length > 0) {
            self.output = Func.generateErrorCode("DATA_EXIST");
            self.output.Data = {
                "policy_id":adjust_exist[0]['policy_id'],
                "adjust_id":adjust_exist[0]['adjust_id'],
                "trigger_id":adjust_exist[0]['trigger_id']
            }
        } else {
            /*如果不存在*/
            var username = config.opsmind.username
            var password = config.opsmind.password

            /*执行请求*/
            var url = util.format("https://bili.private.opsmind.com/api/v1/policies/%s/adjusts/create", policy_id)


            /*
             * Scope.type  指明 label/tag 的匹配方式（默认为 0) 0-列表匹配，1-非列表匹配，2-相等匹配，3-不相等匹配，4-正则列表匹配，5-非正则列表匹配，其中 2/3 只允许在 val 中写入一个值
             * silence : 该字段为 true 则表示此微调不会触发任何告警
             */
            var params = {
                "url": url,
                "form": {
                    scope: JSON.parse(JSON.stringify(scope)),
                    triggers: [{
                        "id": trigger_name,
                        "desc": desc,
                        "notes": trigger_notes,
                        "operator": trigger_operator,
                        "threshold": trigger_threshold,
                        "for":trigger_for,
                        "level": trigger_level,
                        "nodata_type": 'any',
                        "nodata_for": trigger_nodata_for
                    }],
                    notes: JSON.parse(JSON.stringify(trigger_notes)),
                    silence: silence,
                    desc: desc
                }
            }

            var result = req.opsmind_post(username, password, params)

            /*记录数据*/
            var insert_data = {
                'policy_id': policy_id,
                'adjust_id': result.adjust_id,
                'category': category,
                'scope': JSON.stringify(scope),
                'trigger_id': trigger_name,
                'trigger_level': trigger_level,
                'trigger_for': trigger_for,
                'trigger_notes': trigger_notes,
                'trigger_operator': trigger_operator,
                'trigger_threshold': trigger_threshold,
                'trigger_notes': JSON.stringify(trigger_notes),
                'silence': silence,
                'desc': desc,
                'hashid': hash_id,
                'expired_at': moment().add(99, 'y').format('YYYY-MM-DD HH:mm:ss')
            }

            _db.insert('adjust', insert_data)

            self.output.RetCode = 0
            self.output.Data = insert_data
        }

    }
})

