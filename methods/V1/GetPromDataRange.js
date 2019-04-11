/*=============================================================================
#     FileName: GetPromData.js
#         Desc:
       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-06-07 11:57:29
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
var _db = new mysql(config.mysql_bilimoni)
var _cache = new redis(config.redis)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var datasource = self.input.DataSource
        var query = self.input.Query
        var start = self.input.Start ? moment(self.input.Start).format("X") : moment().subtract(3,"hours").format("X");
        var end = self.input.End ? moment(self.input.End).format("X") : moment().format("X");
        var step = self.input.Step


        switch (datasource) {
            case 'shd':
                var query_url = 'http://127.0.0.1/api/v1/query_range'
                break;
        }
  


        //入参验证
        if (!this.checkParams(['DataSource', 'Query', 'Start', 'End', 'Step'])) {
            return;
        }

        var query_param = {
            'url': query_url,
            'form': {
                'query': query,
                'start': start,
                'end': end,
                'step': step,
                '_': moment().format('X')
            }
        }
        console.log(query_param)
        var prom_data = req.get_json(query_param)

        self.output.RetCode = 0
        self.output.Data = prom_data.data.result;

    }
})
