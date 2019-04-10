'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var Redis = require(API_PATH + '/kernel/Redis')
var Aliyun = require(API_PATH + '/kernel/Aliyun')
var fibers = require("fibers")
var _ = require("underscore")
var util = require('util')
var uuidv1 = require('uuid/v1');

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var phone = self.input.Phone
        var app = self.input.App
        var alertname = self.input.AlertName

        //validation
        if (!this.checkParams(['Phone'])) {
            return;
        }

        /*
         * TTS_122295844 很抱歉的打搅到您,目前您的${app_name}业务出现故障迟迟未能有人处理,请及时处理。
         * TTS_119915579 很抱歉的打搅到您,目前您有${count}条紧急告警需要处理,请及时在企业微信上查看处理。
         * TTS_119915577 很抱歉现在打搅到您,目前${app}业务出现${alertname}告警迟迟无人处理。
         */

        var params = {
            'TtsCode': 'TTS_119915577',
            'OutId': uuidv1(),
            'CalledNumber': phone,
            'CalledShowNumber': '02160781008',
            'TtsParam': JSON.stringify({
                "app": app,
                "alertname": alertname 
            })
        }

        var aliyun = new Aliyun()
        var data = aliyun.phonecall(params)

        if (data) {
            self.output.RetCode = 0
            self.output.CallId = data.CallId
            self.output.SendResult = data.Message
            self.output.RequestId = data.RequestId
        }

    }
})
