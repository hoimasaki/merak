'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var fibers = require("fibers")
var _ = require("underscore")
var util = require('util')
var _redis = new redis(config.redis)

module.exports = ApiMethod.extend({
    process: function () {
        var self = this

        self.output.RetCode = 0
        self.output.Sets = 1

    }
})
