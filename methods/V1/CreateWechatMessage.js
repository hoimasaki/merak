/*=============================================================================
#     FileName: GetResourceProList.js
#         Desc: 
       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-03-08 11:29:32
#      History:
=============================================================================*/
'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var mysql = require(API_PATH + '/kernel/MySql')
var req = require(API_PATH + '/kernel/Request')
var service_tree = require(API_PATH + '/kernel/ServiceTree')
var fibers = require("fibers")
var _ = require("underscore")
var moment = require("moment");
var util = require('util');
var _db = new mysql(config.mysql_bilimoni)
var _cache = new redis(config.redis)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var username = self.input.UserName
        var title = self.input.Title
        var content = self.input.Content
        var treeid = self.input.TreeId


        //入参验证
        if (!this.checkParams(['UserName', 'Title', 'Content'])) {
            return;
        }

        var user_array = username.split(/[\s,]+/)
        var treeid_array = treeid.split(/[\s,]+/)

        if (treeid != undefined) {
            var token = new service_tree().get_token()

            _.each(treeid_array, function(row) {
                var row = "bilibili."+row
                //获得role=2研发,role=4运维的用户
                var role_params = {
                    "url": "http://easyst.bilibili.co/v1/node/role/" + row,
                    "header": {
                        "X-Authorization-Token": token,
                        "Content_Type": "application/json",
                    }
                }
                var role_list = req.get(role_params)
                _.each(role_list.data, function(jow) {
                    if (jow.role == 2 || jow.role == 4) {
                        user_array.push(jow.user_name)
                    }
                })

            })
        }
        var user_str = _.uniq(user_array)
        var user_str = user_str.join(',')


        var post_data = {
            "username": user_str,
            "title": self.input.Title,
            "content": self.input.Content,
            "type": 'wechat',
            "timestamp": moment().format('X'),
            "token": "oJnNPGsiuzytMOJP",
        }


        post_data.signature = Func.bap_signature(post_data, 'atwtPilfsfykSBGplhxtxVSGpqaJaBRg')

        var params = {
            "url": "http://bap.bilibili.co/api/v1/message/add",
            "form": post_data
        }

        var result = req.post_json(params)

        self.output.RetCode = 0
        self.output.Data = _.uniq(user_array);
        self.output.Response = result;

    }
})
