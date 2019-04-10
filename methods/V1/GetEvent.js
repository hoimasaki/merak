/*=============================================================================
#     FileName: GetEvent.js
#         Desc: 
       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-06-08 12:04:34
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
var _db = new mysql(config.mysql_bulbasaur)
var _cache = new redis(config.redis)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var event_id = self.input.EventId


        //入参验证
        if (!this.checkParams(['EventId'])) {
            return;
        }

        var event_result = _db.get_where_in('event', 'id', event_id)
        var event_user_result = _db.get_where_in('user_events', 'event_id', event_id)

        var user_event_array = []
        var user_array = []

        //事件ID和用户ID组合
        _.each(event_user_result, function(row) {
            user_array.push(row.user_id)
            user_event_array.push({
                'user_id': row.user_id,
                'event_id': row.event_id
            })
        })

        //去重用户详细查询条件
        user_array = _.uniq(user_array)


        //获取用户详情
        var user_detail = _db.get_where_in('user', 'id', user_array)

        //合并用户和事件Id
        var merge_obj_array = []
        _.each(user_event_array, function(row) {
            _.each(user_detail, function(jow) {
                if (row.user_id == jow.id) {
                    var merge_obj = _.extend(row, jow);
                    merge_obj_array.push(merge_obj)
                }
            })
        })


        //如果事件ID等于，则压入users数组
        _.each(event_result, function(row) {
            var users = []
            _.each(merge_obj_array, function(jow) {
                if (row.id == jow.event_id) {
                    users.push(jow)
                }
            })
            row.users = users
        })



        self.output.RetCode = 0
        self.output.Data = event_result;

    }
})
