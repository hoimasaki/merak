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
        var group = self.input.Group

        var group_exist = _db.select('*', 'databus_group_adjust', {
            'group': group
        })

        if (group_exist.length == 0) {
            self.output = Func.generateErrorCode("DATA_NOT_EXIST");
        } else {

            var username = config.opsmind.username
            var password = config.opsmind.password

            var req_result = []
            _.each(group_exist, function(row) {

                var url = util.format("https://bili.private.opsmind.com/api/v1/policies/%s/adjusts/%s/delete", row['policy_id'], row['adjust_id'])

                var params = {
                    "url": url,
                }

                var username = config.opsmind.username
                var password = config.opsmind.password

                var result = req.opsmind_post(username, password, params)

                if (result) {
                    var db_action = _db.delete("databus_group_adjust", {group:group})
                }

                req_result.push(result)

            })

            self.output.RetCode = 0
        }
    }
})
