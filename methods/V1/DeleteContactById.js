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

        var result = _db.delete("contacts", {
            'id': id 
        })

        if (result) {
            self.output.RetCode = 0
        } else {
            self.output.RetCode = -1
        }
    }
})
