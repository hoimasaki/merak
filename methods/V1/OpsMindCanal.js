/*=============================================================================
#     FileName: GetSign.js
#         Desc: 
       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-06-04 16:38:47
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

module.exports = ApiMethod.extend({
    process: function() {
        var self = this

        var input = self.input

        //validation
        if (!this.checkParams(['Key'])) {
            return;
        }


        /*
         *
         *
         *
         * */


        self.output.Data = '123' 
        self.output.Test = input

    }
})