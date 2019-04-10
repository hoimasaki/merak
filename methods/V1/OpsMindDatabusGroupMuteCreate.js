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

        if (group_exist.length > 0) {
            self.output = Func.generateErrorCode("DATA_EXIST");
        } else {

            var username = config.opsmind.username
            var password = config.opsmind.password
            var policy_list_params = {
                "url": "https://bili.private.opsmind.com/api/v1/policies/list"
            }
            var policy_list = req.opsmind_get(username, password, policy_list_params)

            var policy_id = []
            _.each(policy_list, function(row) {
                var metric_params = {
                    "url": "https://bili.private.opsmind.com/api/v1/metric/" + row.metric + "/config"
                }
                var metric_result = req.opsmind_get(username, password, metric_params)
                if (metric_result.category == 'Databus') {
                    policy_id.push(row.id)
                }
            })


            var result_array = []
            _.each(policy_id, function(row) {
                var url = util.format("https://bili.private.opsmind.com/api/v1/policies/%s/adjusts/create", row)

                var params = {
                    "url": url,
                    "form": {
                        scope: [{
                            "type": 0,
                            "key": "group",
                            "val": [group]
                        }],
                        triggers: [{
                            "id": group,
                            "desc": group
                        }],
                        silence: true
                    }
                }

                var result = req.opsmind_post(username, password, params)
                result['policy_id'] = row
                result['group'] = group
                _db.insert('databus_group_adjust', result)
                result_array.push(result)
            })

            self.output.RetCode = 0
            self.output.Data = result_array

        }
    }
})
