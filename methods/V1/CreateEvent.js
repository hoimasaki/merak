/*=============================================================================
#     FileName: CreateEvent.js
#         Desc:
       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-08-27 17:54:21
#      History:
=============================================================================*/
'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var mysql = require(API_PATH + '/kernel/MySql')
var req = require(API_PATH + '/kernel/Request')
var service_tree = require(API_PATH + '/kernel/ServiceTree')
var fibers = require("fibers")
var _ = require("underscore")
var moment = require("moment");
var util = require('util');
var strictUriEncode = require('strict-uri-encode');
var _db = new mysql(config.mysql_bilimoni)
var _cache = new redis(config.redis)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var username = self.input.UserName
        var event_name = self.input.EventName
        var event_desc = self.input.EventDesc
        var treeid = self.input.TreeId
        var instance_name = self.input.InstanceName
        var status = self.input.Status
        var type = self.input.Type
        var severity = self.input.Severity
        var ruleid = self.input.RuleId
        var begin_at = self.input.BeginAt
        var end_at = self.input.EndAt
        var message = self.input.Message
        var labels = self.input.Label
        var job = self.input.Job

        var _db = new mysql(config.mysql)


        //入参验证
        if (!this.checkParams(['UserName', 'EventName', 'Status', 'Type', 'Severity', 'BeginAt', 'EndAt', 'Label', 'RuleId'])) {
            return;
        }

        /*定义发送人*/
        //添加oncall用户
        var oncall_user = config.oncall
        //定义指定的接收人
        var user_array = username.split(/[\s,]+/)
        //定义Owner标签的接收人
        if (labels.owner != undefined) {
            var owner_team = labels.owner.split(/[\s,]+/)
        } else {
            var owner_team = []
        }
        //联合收件人
        var union_user_array = _.union(oncall_user, user_array, owner_team)

        /*根据APPID查找Tree用户*/
        var treeid_user = function(treeid) {
            var dev_team = []
            var ops_team = []
            var treeid_array = treeid.split(/[\s,]+/)
            var token = new service_tree().get_token()

            _.each(treeid_array, function(row) {
                var row = 'bilibili.' + row
                var role_params = {
                    "url": "http://easyst.bilibili.co/v1/node/role/" + row,
                    "header": {
                        "X-Authorization-Token": token,
                        "Content_Type": "application/json",
                    }
                }
                var role_list = req.get(role_params)

                /*压入用户组,role=2研发,role=4运维用户*/
                _.each(role_list.data, function(jow) {
                    if (jow.role == 2) {
                        dev_team.push(jow.user_name)
                    }
                    if (jow.role == 4) {
                        ops_team.push(jow.user_name)
                    }
                })
            })
            return {
                dev_team: dev_team,
                ops_team: ops_team
            }
        }


        /*根据HOTNAME查找Tree用户*/
        var hostname_user = function(hostname) {
            var dev_team = []
            var ops_team = []
            var token = new service_tree().get_token()
            var role_params = {
                "url": "http://easyst.bilibili.co/v1/role/instance/name/" + hostname,
                "header": {
                    "X-Authorization-Token": token,
                    "Content_Type": "application/json",
                }
            }
            var role_list = req.get(role_params)
            _.each(role_list.data, function(row) {
                _.each(row.role[2], function(jow) {
                    dev_team.push(jow)
                })
                _.each(row.role['4'], function(jow) {
                    ops_team.push(jow)
                })
            })

            return {
                dev_team: _.uniq(dev_team),
                ops_team: _.uniq(ops_team)
            }
        }

        /*调用OPSCACHE*/
        var cache_user = function(pro) {
            var username = _db.select("username", "redis_notify_relationship", {
                "pro": pro
            })
            var cache_team = []
            _.each(username, function(row) {
                cache_team.push(row['username'])
            })
            var cache_team = _.uniq(cache_team)

            return {
                cache_team: cache_team
            }
        }

        /*调用OPSDB*/
        var db_user = function(dbname) {
            var username = _db.select("username", "mysql_notify_relationship", {
                "dbname": dbname
            })
            var db_team = []
            _.each(username, function(row) {
                db_team.push(row['username'])
            })
            var dba_team = ["zhangwen", "qichangtang", "wangyang01", "shenrui"]
            var db_team = _.union(dba_team, db_team)
            var db_team = _.uniq(db_team)

            return {
                db_team: db_team
            }
        }


        /*调用CANAL*/
        var canal_user = function(addr) {
            var username = _db.select("owner", "canal_notify_relationship", {
                "addr": addr
            })
            var canal_team = username[0].owner.split(",")

            return {
                canal_team: canal_team
            }
        }

        /*根据Job判断推送的用户组*/
        switch (job) {
            case 'APM':
                /*通过TreeID查找，只发送研发*/
                if (treeid != undefined) {
                    var tree_user = treeid_user(treeid)
                    union_user_array = _.union(union_user_array, tree_user.dev_team)
                }
                break;
            case '基础监测':
                /*通过Hostname查找，发送研发运维*/
                var tree_user = hostname_user(treeid)
                union_user_array = _.union(union_user_array, tree_user.ops_team, tree_user.dev_team)
                break;
            case 'Exporter':
                /*通过Hostname查找，发送研发运维*/
                var tree_user = hostname_user(treeid)
                console.log(tree_user)
                console.log(treeid)
                union_user_array = _.union(union_user_array, tree_user.ops_team, tree_user.dev_team)
                break;
            case 'Redis':
                /*通过OPSCACHE查找*/
                var tree_user = cache_user(labels.pro)
                union_user_array = _.union(union_user_array, tree_user.cache_team)
                break;
            case 'Memcache':
                /*通过OPSCACHE查找*/
                var tree_user = cache_user(labels.pro)
                union_user_array = _.union(union_user_array, tree_user.cache_team)
                break;
            case 'Canal':
                /*通过CANAL查找*/
                var tree_user = canal_user(labels.addr)
                union_user_array = _.union(union_user_array, tree_user.canal_team)
                break;
            case 'MySQL':
                /*通过OPSDB查找*/
                if (treeid != undefined) {
                    var tree_user = treeid_user(treeid)
                    union_user_array = _.union(union_user_array,tree_user.dev_team)
                }
                break;
            case 'Databus':
                /*通过TreeID查找，只发送研发*/
                if (treeid != undefined) {
                    var tree_user = treeid_user(treeid)
                    union_user_array = _.union(union_user_array, tree_user.dev_team)
                }
                break;
            case 'node_exporter':
                /*通过Hostname查找，发送研发运维*/
                var tree_user = hostname_user(treeid)
                union_user_array = _.union(union_user_array, tree_user.ops_team, tree_user.dev_team)
                break;
            default:
                /*通过TreeID查找，发送研发运维*/
                if (treeid != undefined) {
                    var tree_user = treeid_user(treeid)
                } else {
                    var tree_user = {
                        dev_team: [],
                        ops_team: []
                    }
                }
                union_user_array = _.union(union_user_array, tree_user.dev_team, tree_user.ops_team)
                break;
        }


        /*appmode switch
         * pre -send to oncall
         * prod - send to all
         */

        if (config.app_mode == 'pre') {
            var user_str = config.oncall.join(',')
        } else {
            var user_str = _.uniq(union_user_array)
            var user_str = user_str.join(',')
        }


        var post_data = {
            "username": user_str,
            "event_name": event_name,
            "event_description": event_desc,
            "st_key": treeid,
            "message": message,
            "product_name": 'Service',
            "severity": severity,
            "instance_name": instance_name,
            "timestamp": moment().format('X'),
            "status": status,
            "rule": ruleid,
            "type": "alert",
            "begin_at": begin_at,
            "end_at": end_at,
            "token": "oJnNPGsiuzytMOJP",
            "labels": labels
        }

        post_data.signature = Func.bap_signature(post_data, config.bap.secret)

        var params = {
            "url": config.bap.url,
            "form": post_data
        }
        var result = req.post_json(params)


        self.output.RetCode = 0
        self.output.Data = {
            'receiver': union_user_array
        };
        self.output.Response = result;

    }
})
