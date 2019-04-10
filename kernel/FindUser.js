/*=============================================================================
#     FileName: FindUser.js
#         Desc: 
#       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-12-05 15:56:34
#      History:
=============================================================================*/
var service_tree = require('./ServiceTree')
var req = require('./Request')
var _ = require('underscore')
var mysql = require(API_PATH + "/kernel/MySql")
var _db = new mysql(config.mysql)

var finduser = function() {

    this.fetch = function(params) {

        var dev_team = []
        var ops_team = []
        var cache_team = []
        var canal_team = []



        //记录查找方式的结果
        var tree_result = []
        var instance_result = []
        var pro_result = []
        var db_result = []
        var addr_result = []


        //查找Tree
        var tree_token = new service_tree().get_token()

        try {
            /*根据instance name查找Tree用户*/
            var role_params = {
                "url": "http://easyst.bilibili.co/v1/role/instance/name/" + params.instance_name,
                "header": {
                    "X-Authorization-Token": tree_token,
                    "Content_Type": "application/json",
                }
            }
            var role_list = req.get(role_params)
            _.each(role_list.data, function(row) {
                _.each(row.role[2], function(jow) {
                    dev_team.push(jow)
                    instance_result.push(jow)
                })
                _.each(row.role['4'], function(jow) {
                    ops_team.push(jow)
                    instance_result.push(jow)
                })
            })
        } catch {

        }


        try {
            /*根据TreeId查找Tree用户*/
            var treeid_array = params.tree_id.split(/[\s,]+/)
            _.each(treeid_array, function(row) {
                var row = 'bilibili.' + row
                var role_params = {
                    "url": "http://easyst.bilibili.co/v1/node/role/" + row,
                    "header": {
                        "X-Authorization-Token": tree_token,
                        "Content_Type": "application/json",
                    }
                }
                var role_list = req.get(role_params)
                /*压入用户组,role=2研发,role=4运维用户*/
                _.each(role_list.data, function(jow) {
                    if (jow.role == 2) {
                        dev_team.push(jow.user_name)
                        tree_result.push(jow.user_name)
                    }
                    //去除MySQL的運帷查找
                    if (params.category != 'MySQL') {
                        if (jow.role == 4) {
                            ops_team.push(jow.user_name)
                            tree_result.push(jow.user_name)
                        }
                    }
                })
            })
        } catch {}


        try {
            /*根据OPSCACHE查找用户*/
            var username = _db.select("username", "redis_notify_relationship", {
                "pro": params.pro
            })
            _.each(username, function(row) {
                cache_team.push(row['username'])
                pro_result.push(row['username'])
            })
        } catch {}



        try {
            /*根据CANAL查找用户*/
            var username = _db.select("owner", "canal_notify_relationship", {
                "addr": params.addr
            })
            canal_team = username[0].owner.split(",")
            _.each(canal_team, function(row) {
                add_result.push(row)
            })
        } catch {}


        if (params.category == 'MySQL') {
            var dba_team = ["zhangwen", "qichangtang", "wangyang01", "shenrui"]
            var username = _.union(dev_team, ops_team, cache_team, canal_team, dba_team)
        } else {
            var username = _.union(dev_team, ops_team, cache_team, canal_team)
        }

        var search_result = {
            params,
            "tree_result": tree_result,
            "instance_result": instance_result,
            "pro_result": pro_result,
            "addr_result": addr_result,
            "user_name":username
        }

        return search_result

    }

}


module.exports = finduser

