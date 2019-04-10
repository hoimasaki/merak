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
        var adjust_id = self.input.AdjustId

        var url = util.format("https://bili.private.opsmind.com/api/v1/policies/%s/adjusts/%s/delete", policy_id, adjust_id)

        var params = {
            "url": url,
        }

        var username = config.opsmind.username
        var password = config.opsmind.password

        var delete_result = _db.delete('adjust',{
            'policy_id': policy_id,
            'adjust_id': adjust_id
        })


        var result = req.opsmind_post(username, password, params)
        var result = JSON.parse(result)
        if (delete_result && _.isEmpty(result)) {
            self.output.RetCode = 0
        } else {
            self.output =  self.output = Func.generateErrorCode("DATA_FAIL") 
            self.output.Data = result
        }


    }

})
