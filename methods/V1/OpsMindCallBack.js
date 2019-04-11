/*=============================================================================
#     FileName: OpsMindCallBack.js
#         Desc:
       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-08-27 17:54:52
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

        switch (self.input.active) {
            case true:
                var status = 'firing'
                var event_desc = util.format("%s-%s", self.input.policy.name, self.input.trigger.id)
                break;
            case false:
                var status = 'resolved'
                var event_desc = util.format(self.input.policy.name)
                break;
        }

        switch (self.input.trigger.operator) {
            case '>':
                var operator = '大于'
                break;
            case '>=':
                var operator = '大于等于'
                break;
            case '<':
                var operator = '小于'
                break;
            case '<=':
                var operator = '小于等于'
                break;
            case '!=':
                var operator = '不等于'
                break;
            case '==':
                var operator = '等于'
                break;
        }

        var labels = _.extend(self.input.tags, self.input.notes)
        labels.category = self.input.metric.category


        /*发送逻辑
         * 所有的发送通道具有3个属性
         * treeid服务树的id
         * instanceid 具体实例id
         * clusterid 集群id
         */
        var category = self.input.metric.category
        try {
            var category = category.split("/")[0]
        } catch (err) {}


        switch (category) {
            case 'APM':
                var treeId = self.input.tags.app
                if (treeId == undefined) {
                    treeId = category
                }
                var instance_name = "\n"
                _.each(self.input.tags, function(value, key) {
                    if (key == 'app' || key == 'code' || key == 'method') {
                        instance_name += key + ":" + value + "\n"
                    }
                })
                break;
            case 'Exporter':
                var treeId = self.input.tags.name
                var instance_name = "\n"
                _.each(self.input.tags, function(value, key) {
                    if (key != 'exported_instance' && key != 'exported_job' && key != 'host' && key != 'instance_id' && key != 'type' && key != 'owner' && key != 'pro' && key != 'category') {
                        instance_name += key + ":" + value + "\n"
                    }
                })
                break;
            case '基础监测':
                if (self.input.tags.exported_instance_name == undefined) {
                    var treeId = self.input.tags.instance_name
                } else {
                    var treeId = self.input.tags.exported_instance_name
                }

                var instance_name = "\n"
                _.each(self.input.tags, function(value, key) {
                    if (key == 'instance_name' || key == 'instance' || key == 'device' || key == 'fstype' || key == 'mountpoint') {
                        instance_name += key + ":" + value + "\n"
                    }
                })
                break;
            case 'MySQL':
                var treeId = self.input.tags.tree_path
                var instance_name = "\n"
                _.each(self.input.tags, function(value, key) {
                    if (key == 'address' || key == 'app_name' || key == 'role' || key == 'pro')
                        instance_name += key + ":" + value + "\n"
                })
                break;
            case 'Docker':
                if (self.input.tags.container_env_app_id != undefined) {
                    var treeId = self.input.tags.container_env_app_id
                    var instance_name = "\nPod:" + self.input.tags.container_env_pod_name + "\nEnv:" + self.input.tags.container_env_deploy_env
                }
                if (self.input.tags.container_env_marathon_app_id != undefined) {
                    var treeId = self.input.tags.container_env_marathon_app_id
                    var instance_name = "\nPod:" + self.input.tags.container_env_mesos_task_id + "\nEnv:" + self.input.tags.container_env_deploy_env
                }
                if (self.input.tags.exported_host != undefined) {
                    var treeId = self.input.tags.exported_host
                    var instance_name = self.input.tags.exported_host
                }
                break;
            case 'Databus':
                var params = {
                    "url": "http://127.0.0.1"
                }
                var app_list = req.get(params)['data']
                var sven_result = _.findWhere(app_list, {
                    "group": self.input.tags.group
                })
                var treeId = sven_result.project
                var instance_name = self.input.tags.group + "/" + self.input.tags.topic
                break;
            default:
                //默认把category当作TreeID
                var treeId = category
                var instance_name = "\n"
                _.each(self.input.tags, function(value, key) {
                    if (key != 'exported_instance' && key != 'exported_job' && key != 'host' && key != 'instance_id' && key != 'type' && key != 'owner' && key != 'pro' && key != 'category') {
                        instance_name += key + ":" + value + "\n"
                    }
                })
                break;
        }

        /*
        oncall用户,opsmind中添加owner的tag,用","隔开,联合系统设置的oncall用户
        */
        try {
            var opsmind_owner = self.input.tags.owner.split(/[\s,]+/)
        } catch (err) {
            //logger.error(err)
            var opsmind_owner = []
        }

        var oncall_user = _.union(opsmind_owner, config.oncall)
        var user_str = oncall_user.join(",")


        /*无数据上报*/
        if (self.input.tags.nodata) {
            var message_content = '无数据上报,请检查采集端'
        } else {
            /*有数据上报*/
            //强制去除42的值
            if (self.input.value == '42') {
                treeId = undefined
            } else {
                var message_content = util.format("%s %s %s", self.input.value.toFixed(2), operator, self.input.trigger.threshold)
            }

        }

        /*发送Data*/
        var event_params = {
            "Action": "CreateEvent",
            "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubtuhui@bilibili.com",
            "UserName": user_str,
            "EventName": self.input.alert_id,
            "EventDesc": event_desc,
            "BeginAt": moment(new Date(self.input.start * 1000)).format(),
            "EndAt": moment(new Date(self.input.end * 1000)).format(),
            "InstanceName": instance_name,
            "TreeId": treeId,
            "Type": "Alert",
            "Severity": self.input.trigger.level,
            "Label": labels,
            "Job": category,
            "Status": status,
            "Message": message_content,
            "RuleId": self.input.policy.id
        }

        var sign = merak_sdk.sign(event_params, '32e9a1b4827fc4e3c614a5abbdd162a9ac780264')
        event_params.Signature = sign

        var result = req.post_json({
            'url': 'http://localhost:'+config.app_port,
            'form': event_params
        })

        self.output.RetCode = 0
        self.output.Data = result

    }
})
