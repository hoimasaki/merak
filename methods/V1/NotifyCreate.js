/*=============================================================================
#     FileName: NotifyCreate.js
#         Desc: 
#       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-12-28 17:11:11
#      History:
=============================================================================*/
'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var mysql = require(API_PATH + '/kernel/MySql')
var fibers = require("fibers")
var _ = require("underscore")
var util = require('util')
var moment = require('moment');
var _redis = new redis(config.redis)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var send_type = self.input.SendType /*wechat,wechat_text,sms,phone*/
        var username = self.input.UserName
        var treeid = self.input.TreeId
        var content = self.input.Content
        var severity = self.input.Severity.toUpperCase()

        //定义队列优先级
        switch (severity) {
            case "P0":
                var priority = 0
                break;
            case "P1":
                var priority = 1
                break;
            case "P2":
                var priority = 2
                break;
            case "P3":
                var priority = 3
                break;
            case "P4":
                var priority = 4
                break;
            case "P5":
                var priority = 5
                break;
            default:
                var priority = 5
                break

        }

        //validation
        if (!this.checkParams(['Severity', 'SendType', 'UserName', 'Content'])) {
            return;
        }

        //Oncall
        var oncall = config.oncall
        var username = username.split(",")
        _.each(oncall, function(row) {
            username.push(row)
        })
        var username = _.uniq(username)

        /*记录流量
         */
        //查询当前流量上限
        var userinfo = JSON.parse(_redis.get("notify_userinfo_" + self.input.PublicKey))
        //一分钟上限
        var user_m_limit = userinfo.m_rate_limit
        //一小时上限
        var user_h_limit = userinfo.h_rate_limit
        //查询当前区间内的已用流量 
        //一分钟已用
        var user_m_used = _redis.get("notify_rate_m_used_user_" + self.input.PublicKey)
        //一小时已用
        var user_h_used = _redis.get("notify_rate_h_used_user_" + self.input.PublicKey)

        //查询Key的TTL
        var m_used_ttl = _redis.ttl("notify_rate_m_used_user_" + self.input.PublicKey)
        var h_used_ttl = _redis.ttl("notify_rate_h_used_user_" + self.input.PublicKey)

        //如果已用流量为已经过期或者不存在则创建已用的Key,过期时间分别为60秒，3600秒,存在则计数器加1
        if (m_used_ttl == '-1' || m_used_ttl == '-2') {
            _redis.setttl("notify_rate_m_used_user_" + self.input.PublicKey, 0, 60)
        } else {
            _redis.incr("notify_rate_m_used_user_" + self.input.PublicKey)
        }

        if (h_used_ttl == '-1' || h_used_ttl == '-2') {
            _redis.setttl("notify_rate_h_used_user_" + self.input.PublicKey, 0, 3600)
        } else {
            _redis.incr("notify_rate_h_used_user_" + self.input.PublicKey)
        }


        //流量截断
        //对非Email类的告警进行流量截断,和低等级
        if (send_type == 'email' || severity == 'P0' || severity == 'P1') {
            user_m_limit = '999999'
            user_h_limit = '999999'
        }
        if (user_m_limit <= user_m_used && user_h_limit <= user_h_used) {
            console.log("limit")
            self.output = Func.generateErrorCode("NOTICE_RATE_OUT_OF_LIMIT")
        } else {
            //极端情况降级
            var wechat_channel_status = _redis.get("wechat_channel_status")
            if(wechat_channel_status == 'failed'){
                var send_type = 'email'
            }
            var data_params = {
                "treeid": treeid,
                "severity": severity,
                "content": content,
                "sendtype": send_type,
                "status": 'queued',
                "create_time": moment().format('YYYY-MM-DD HH:mm:ss')
            }
            //Push To Queue
            data_params.update_time = moment().format('YYYY-MM-DD HH:mm:ss')
            data_params.username = username
            _redis.lpush('notify_pre_queue_' + priority, JSON.stringify(data_params))

            self.output.RetCode = 0
        }
    }

})

