/*=============================================================================
#     FileName: CreateEventTest.js
#         Desc: 
#       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-08-16 12:25:13
#      History:
=============================================================================*/
var request = require('request')
var moment = require('moment')

for (var i = 0; i < 1000; i++) {
    var options = {
        uri: 'http://127.0.0.1:2266',
        method: 'POST',
        json: true,
        body: {
            "Action": "CreateEvent2",
            "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehub",
            "Signature": "1",
            "Project": "1",
            "Priority": "1",
            "Severity": "p2",
            "EventName": "test"+i,
            "Label": {
                "策略": "内存过高策略",
                "来源": "bilimoni",
                "阀值": "90 > 10",
                "环境" : "prod"
            },
            "UserName": "tuhui",
            "TreeId": "ops.test",
            "SendType": "wechat"
        }
    }

    request(options, function(err, res, body) {
        console.log(body)
    })
}
