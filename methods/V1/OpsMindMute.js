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
        var alertid = self.input.AlertId
        var mute_until = self.input.MuteUntil
        
        var alertid_array = alertid.split(",")
        var params = {
            "url": "https://bili.private.opsmind.com/api/v1/alerts/mute",
            "form": {
                "alerts": alertid_array,
                "mute_until": parseInt(moment().add(mute_until,"hours").format('X')) 
            }
        }

        var username = config.opsmind.username
        var password = config.opsmind.password

        var result = req.opsmind_post(username,password,params)

        self.output.RetCode = 0 
    }

})
