'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var Redis = require(API_PATH + '/kernel/Redis')
var Mail = require(API_PATH + '/kernel/Email')
var fibers = require("fibers")
var _ = require("underscore")
var util = require('util')

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var cc = self.input.Cc
        var to = self.input.To
        var subject = self.input.Subject
        var sender = self.input.Sender
        var html = self.input.Html

        var mail = new Mail()
        var params = {
            "from": "no-reply@bilibili.com",
            "sender": sender,
            "to": to,
            "subject": subject,
            "html": html
        }

        var data = mail.send(params)

        if (data) {
            self.output.RetCode = 0
            self.output.Data = data
        }

    }
})
