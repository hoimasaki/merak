/*=============================================================================
#     FileName: OpsMindCallBackNew.js
#         Desc:
       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-12-04 12:40:01
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
var Finduser = require(API_PATH + '/kernel/FindUser')

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

        var labels = _.extend(self.input.tags, self.input.notes)


        /*判断TreeID*/
        //优先查找app_id,app,tree,如果没有择选择category
        if (labels.app_id != undefined) {
            var tree_id = labels.app_id
        } else if (labels.app != undefined) {
            var tree_id = labels.app
        } else if (labels.tree_id != undefined) {
            var tree_id = labels.tree_id
        } else if (labels.tree_path != undefined) {
            var tree_id = labels.tree_path
        } else if (labels.container_env_app_id != undefined) {
            var tree_id = labels.container_env_app_id
        } else {
            var tree_id = self.input.metric.category
        }


        /*判断instance_name*/
        if (labels.instance_name != undefined) {
            var instance_name = labels.instance_name
        } else if (labels.name != undefined) {
            var instance_name = labels.name
        } else if (labels.hostname != undefined) {
            var instance_name = labels.hostname
        } else if (labels.host_name != undefined) {
            var instance_name = labels.host_name
        } else {
            var instance_name = labels.exported_instance
        }


        /*判断pro*/
        if (labels.pro != undefined) {
            var pro = labels.pro
        } else {
            var pro = 'nopro'
        }

        /*判断group*/
        if (labels.pro != undefined) {
            var group = labels.group
        } else {
            var group = 'nogroup'
        }


        /*判断addr*/
        if (labels.addr != undefined) {
            var addr = labels.addr
        } else {
            var addr = 'noaddr'
        }

        /*如果owner未定义则开始查找目标发送用户*/
        var finduser = new Finduser()
        switch (self.input.metric.category) {
            case 'MySQL':
                var finduser_params = {
                    category: self.input.metric.category,
                    subject: event_desc,
                    tree_id: tree_id
                }
                break;
            default:
                var finduser_params = {
                    category: self.input.metric.category,
                    subject: event_desc,
                    tree_id: tree_id,
                    instance_name: instance_name,
                    pro: labels.pro,
                    group: labels.group,
                    addr: labels.addr
                }
                break;
        }
        var find_user_result = finduser.fetch(finduser_params)
        var username = find_user_result.user_name


        /*
        oncall用户,opsmind中添加owner的tag,用","隔开,联合系统设置的oncall用户
        */
        try {
            var opsmind_owner = self.input.tags.owner.split(/[\s,]+/)
        } catch (err) {
            //logger.error(err)
            var opsmind_owner = []
        }

        /*如果设置了owner标签,不在查找服务树*/
        if (opsmind_owner.length > 0) {
            var oncall_user = _.union(opsmind_owner, config.oncall)
        } else {
            var oncall_user = _.union(opsmind_owner, config.oncall, username)
        }
        var user_str = oncall_user.join(",")



        /*判断发送内容*/
        if (self.input.tags.nodata) {
            var message_content = '无数据上报,请检查采集端'
        } else {
            /*有数据上报*/
            //强制去除42的值
            if (self.input.value == '42') {
                return true
            } else {
                var message_content = util.format("%s %s %s", self.input.value.toFixed(2), self.input.trigger.operator, self.input.trigger.threshold)
            }

        }

        /*发送到Notify*/
        var notify_labels = labels
        notify_labels["status"] = status
        notify_labels["category"] = self.input.metric.category
        notify_labels["policy_id"] = self.input.policy.id
        notify_labels["alert_id"] = self.input.alert_id


        /*定义发送队列*/
        var notify_array = []
        var notify_result = []

        /*全局发送渠道*/
        var default_send_param = {
            'send_type': 'wechat_card',
            'content': {
                "subject": event_desc,
                "create_time": moment(self.input.start * 1000).format('YYYY-MM-DD HH:mm:ss'),
                "body": message_content,
                "label": notify_labels,
                "aggreation": self.input.notes["agg"]
            }
        }
        notify_array.push(default_send_param)

        switch (self.input.trigger.level) {
            case 'P0':
                var send_param = {
                    'send_type': 'phone',
                    'content': {
                        "template": "TTS_119915577",
                        "subject": event_desc,
                        "body": message_content
                    }
                }
                notify_array.push(send_param)
                break;
        }


        //开始发送
        _.each(notify_array, function(row) {
            var notify_params = {
                "Action": "NotifyCreate",
                "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubtuhui@bilibili.com",
                "Signature": 1,
                "Severity": self.input.trigger.level,
                "Content": row.content,
                "SendType": row.send_type,
                "UserName": user_str,
                "TreeId": tree_id
            }
            var notify_sign = merak_sdk.sign(notify_params, '32e9a1b4827fc4e3c614a5abbdd162a9ac780264')
            notify_params.Signature = notify_sign

            var req_result = req.post_json({
                'url': 'http://merak.bilibili.co',
                'form': notify_params
            })


            //超过限制降低等级发送邮件
            if (req_result.RetCode == 20000) {
                var notify_mail_params = {
                    "Action": "NotifyCreate",
                    "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubtuhui@bilibili.com",
                    "Signature": "1",
                    "Severity": self.input.trigger.level,
                    "UserName": user_str,
                    "TreeId": tree_id,
                    "SendType": "email",
                    "Content": row.content
                }
                var req_result = req.post_json({
                    'url': 'http://merak.bilibili.co',
                    'form': notify_mail_params
                })
            }

            notify_result.push(req_result)

        })


        self.output.RetCode = 0
        self.output.Data = notify_result[0]

    }
})

