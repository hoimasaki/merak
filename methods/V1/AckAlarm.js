'use strict';
var ApiMethod = require(API_PATH + "/kernel/ApiMethod");
var Func = require(API_PATH + "/kernel/Func");
var redis = require(API_PATH + '/kernel/Redis');
var mysql = require(API_PATH + '/kernel/MySql');
var fibers = require("fibers");
var _ = require("underscore");
var moment = require("moment");
var util = require('util');
var db = new mysql(config.mysql_bulbasaur);
var req = require(API_PATH + "/kernel/Request")
const CheckIntOrIntString = Func.CheckIntOrIntString;

const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

module.exports = ApiMethod.extend({
    process: function() {
        var self = this;
        var id = self.input.Id;
        var comment = self.input.Comment;
        var starttime = moment(self.input.StartTime).format('YYYY-MM-DD HH:mm:ss');
        var endtime = moment(self.input.EndTime).format('YYYY-MM-DD HH:mm:ss');

        //获取事件数据
        var event_result = db.select("*", "event", {
            "id": id
        })


        var opsmind_ids = []
        //逐一处理每个ID
        _.each(event_result, function(row) {

            var event_id = row.id
            var hash_id = row.hash_id
            opsmind_ids.push(row.event_name)

            //获取事件关联的用户ID
            var user_result = db.select("*", "user_events", {
                "event_id": event_id
            })
            var user_event_array = []
            _.each(user_result, function(user) {
                user_event_array.push({
                    'user_id': user['user_id'],
                    'event_id': user['event_id']
                })
            })


            _.each(user_event_array, function(event) {

                var silence_param = {
                    'user_id': event.user_id,
                    'hash_id': hash_id,
                    'comment': comment,
                    'start_at': starttime,
                    'end_at': endtime,
                    'created_at': moment().format('YYYY-MM-DD HH:mm:ss')
                }

                //更新ACK标记位
                var ack_flag_update_result = db.update("event", {
                    "id": event_id
                }, {
                    'ack': 1
                })

                //写入Silence
                var silence_insert_result = db.insert("silence", silence_param)

            })
        })


        //opsmind记录ACK
        var opsMindAckParams = {
            "url": "https://bili.private.opsmind.com/api/v1/alerts/logs/add",
            "form": {
                "alerts": opsmind_ids,
                "type": "ALERT_ACK",
                "log": comment
            }
        };

        // opsmind静默 
        var opsMindMuteparams = {
            "url": "https://bili.private.opsmind.com/api/v1/alerts/mute",
            "form": {
                "alerts": opsmind_ids,
                "mute_until": parseInt(moment(endtime).format('X'))
            }
        };

        var username = config.opsmind.username;
        var password = config.opsmind.password;

        var opsMindAckResult = req.opsmind_post(username, password, opsMindAckParams);
        var opsMindMuteResult = req.opsmind_post(username, password, opsMindMuteparams);



        if (_.isEmpty(opsMindAckResult) && _.isEmpty(opsMindMuteResult)) {
            self.output.RetCode = 0;
        }else{
            self.output = Func.generateErrorCode("DATA_FAILED")
        }
    }
});
