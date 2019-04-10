'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var fibers = require("fibers")
var _ = require("underscore")
var util = require('util')
var mysql = require(API_PATH + "/kernel/MySql")
var _db = new mysql(config.mysql)
var _redis= new redis(config.redis)

module.exports = ApiMethod.extend({
    process: function () {
        var self = this
        var login_url = util.format(" %s/loginPage?caller=%s",config.dashboard.url,config.dashboard.key)
       
        self.output.RetCode = 0
        self.output.Data = login_url
      
    }
})
