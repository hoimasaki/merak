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
        var id = self.input.Id
        var result = _db.select("*", "contacts", {
            'id': id
        })

        self.output.RetCode = 0
        self.output.Data = result[0]
    }
})
