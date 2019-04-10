'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var fibers = require("fibers")
var _ = require("underscore")
var util = require('util')
var mysql = require(API_PATH + "/kernel/MySql")
var req = require(API_PATH + "/kernel/Request")
var _db = new mysql(config.mysql)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this

        var param = {
            "url": "https://bili.private.opsmind.com/api/v1/alerts/callbacks/list",
        }
        var username = config.opsmind.username
        var password = config.opsmind.password

        var result = req.opsmind_get(username,password,param)

        self.output.RetCode = 0 
        self.output.Data = result

    }

})
