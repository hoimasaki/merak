'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var fibers = require("fibers")
var _ = require("underscore")
const util = require('util')
const mysql = require(API_PATH + "/kernel/MySql")
var db = new mysql(config.mysql)
const crypto = require('crypto');
var redis_conn = new redis(config.redis)

module.exports = ApiMethod.extend({
    process: function () {
        var self = this

        var username = self.input.Username
        var password = self.input.Password


        var timestamp = new Date().getTime()
        var token = crypto.createHash('md5').update(username + timestamp).digest('hex');

       	self.output.RetCode = 0
        self.output.Sets = {
            value: 1,
            Token: token
        }
    }
})
