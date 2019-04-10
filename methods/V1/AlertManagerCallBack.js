/*=============================================================================
#     FileName: AlertManager.js
#         Desc:
       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-06-26 16:33:12
#      History:
=============================================================================*/
'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var mysql = require(API_PATH + '/kernel/MySql')
var req = require(API_PATH + '/kernel/Request')
var merak_sdk = require('merak-sdk-node')
var fibers = require("fibers")
var _ = require("underscore")
var moment = require("moment");
var util = require('util');
var merak_sdk = require('merak-sdk-node');

module.exports = ApiMethod.extend({
    process: function() {
        var self = this

        _.each(self.input.alerts, function(row) {
            var job = row.labels.job
            switch (job) {
                case 'node_exporter':
                    var event_params = {
                        'EventDesc': row.annotations.summary,
                        'EventName': row.labels.alertname,
                        'InstanceName': row.labels.instance,
                        'Label': row.labels,
                        'Message': row.annotations.summary,
                        'RuleId': row.labels.rule_id,
                        'Severity': 'no',
                        'Status': row.status,
                        'TreeId': 'no',
                        'Job': job,
                        'Type': 'Alert',
                    }
                    break;
                case 'mainsite_app_metrics':
                    if (row.labels.app == 'config-service') {
                        row.labels.app = 'main.common-arch.config-service'
                    }
                    if (row.labels.app == 'identify-game-service') {
                        row.labels.app = 'main.account.identify-game-service'
                    }

                    var event_params = {
                        'EventDesc': row.annotations.tactics,
                        'EventName': row.labels.alertname,
                        'InstanceName': row.labels.app,
                        'Label': row.labels,
                        'Message': parseFloat(row.annotations.current_value).toFixed(2) + row.annotations.operator  + parseFloat(row.annotations.threshold).toFixed(2),
                        'RuleId': '0',
                        'Severity': row.labels.severity.toUpperCase(),
                        'Status': row.status,
                        'TreeId': row.labels.app,
                        'Type': 'Alert',
                        'Job': job,
                        'UserName': 'tuhui',
                        'BeginAt': row.startsAt,
                        'EndAt': row.endsAt
                    }
                    break;
                case 'container':
                    var event_params = {
                        'EventDesc': 'Pass容器告警策略',
                        'EventName': row.labels.alertname,
                        'InstanceName': row.labels.container_env_pod_name,
                        'Label': row.labels,
                        'Message': row.annotations.summary,
                        'RuleId': '0',
                        'Severity': row.labels.severity,
                        'Status': row.status,
                        'TreeId': row.labels.container_env_app_id,
                        'Type': 'Alert',
                        'Job': job,
                        'UserName': 'tuhui',
                        'BeginAt': row.startsAt,
                        'EndAt': row.endsAt
                    }
                    break;
            }

            //Print Log
            if (config.log_level == 'debug') {
                logger.debug(util.inspect(event_params, false, null))
            }

            var sign = merak_sdk.sign(event_params, '32e9a1b4827fc4e3c614a5abbdd162a9ac780264')
            event_params.Signature = sign
            event_params.Action = 'CreateEvent'
            event_params.PublicKey = '9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubtuhui@bilibili.com'
            var result = req.post_json({
                'url': 'http://localhost:' + config.app_port,
                'form': event_params
            })
        })

        self.output.RetCode = 0

    }
})
