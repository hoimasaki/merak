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
        var query = self.input.Query

        //validation
        if (!this.checkParams(['Query'])) {
            return;
        }

        var username = config.opsmind.username
        var password = config.opsmind.password

        /*执行请求*/
        var url = util.format("https://bili.private.opsmind.com/api/v1/adjusts/query")


        var params = {
            "url": url,
            "form": {
                tags:query 
            }
        }

        var result = req.opsmind_post(username, password, params)
        self.output.RetCode = 0
        self.output.Data = result
    }

})

