/*=============================================================================
#     FileName: WechatLogin.js
#         Desc:
       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-06-20 17:06:52
#      History:
=============================================================================*/
'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var mysql = require(API_PATH + '/kernel/MySql')
var req = require(API_PATH + '/kernel/Request')
var merak_sdk = require('merak-sdk-node')
var fibers = require("fibers")
var _ = require("underscore")
var moment = require("moment");
var util = require('util');
var merak_sdk = require('merak-sdk-node');
var sha1 = require("sha1");
var wechat = require(API_PATH + "/kernel/Wechat")
var _db = new mysql(config.mysql_bulbasaur)
var _redis = new redis(config.redis)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var code = self.input.Code
        var app = self.input.App

        if(app == undefined){
            var app = 'bilimoni'
        }

        if (app == 'bilimoni') {
            var user = new wechat().get_login_user(config.wechat_bilimoni.corpid, config.wechat_bilimoni.corpsecret, code,app)
        } else {
            var user = new wechat().get_login_user(config.wechat_contact.corpid, config.wechat_contact.corpsecret, code,app)
        }
        user.code = code

        if (user.errcode == 0) {
            var user_exisit = _db.get_where_in('user', 'wechatid', user.UserId)
            if (user_exisit.length != 0) {
                _redis.setttl(user.UserId + "_verify", code, 3600)
            }
            self.output.RetCode = 0
            self.output.Data = user
        } else {
            self.output.RetCode = -1
        }



    }
})
