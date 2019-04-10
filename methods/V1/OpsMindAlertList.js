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
var querystring = require('query-string')
var _db = new mysql(config.mysql)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var policy_id = self.input.PolicyId
        var start = self.input.Start ? self.input.Start : moment().subtract(3,"hours").format("X");
        var end = self.input.End ? self.input.End : moment().format("X")

        var params = {
            "url": util.format("https://bili.private.opsmind.com/api/v1/alerts/list?%s", querystring.stringify({
                "policy_id": policy_id,
                "start":start,
                "end": end 
            }))
        }

        var username = config.opsmind.username
        var password = config.opsmind.password

        var result = req.opsmind_get(username, password, params)

        self.output.RetCode = 0
        self.output.Sets = result

    }

})
