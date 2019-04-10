'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var fibers = require("fibers")
var _ = require("underscore")
var util = require('util')
var mysql = require(API_PATH + "/kernel/MySql")
var _db = new mysql(config.mysql)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var username = self.input.UserName
        var realname = self.input.RealName
        var nickname = self.input.NickName
        var wechat = self.input.Wechat
        var phone = self.input.Phone
        var email = self.input.Email
        var dep = self.input.Dep
        var position = self.input.Position

        var insert_data = {
            "realname": realname,
            "nickname": nickname,
            "username": username,
            "wechat": wechat,
            "phone": phone,
            "email": email,
            "dep" : dep,
            "position" : position
        }

        var result = _db.insert("contacts", insert_data)

        if (result) {
            self.output.RetCode = 0
        } else {
            self.output.RetCode = -1
        }
    }
})
