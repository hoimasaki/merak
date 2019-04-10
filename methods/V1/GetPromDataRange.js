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


        // switch (datasource) {
        //     case 'shd':
        //         var query_url = 'http://test.sh.prometheus.bilibili.co/api/v1/query_range'
        //         break;
        //     case 'hzxs':
        //         var query_url = 'http://hzxs.prometheus.bilibili.co/api/v1/query_range'
        //         break;
        //     case 'shylf':
        //         var query_url = 'http://shylf.prometheus.bilibili.co/api/v1/query_range'
        //         break;
        //     case 'bak':
        //         var query_url = 'http://bak-prometheus.bilibili.co/api/v1/query_range'
        //         break;
        //     case 'docker':
        //         var query_url = 'http://docker.prometheus.bilibili.co/api/v1/query_range'
        //         break;
        //     case 'app':
        //         var query_url = 'http://app.prometheus.bilibili.co/api/v1/query_range'
        //         break;
        //     case 'tencent_main':
        //         var query_url = 'http://main.tx.prometheus.bilibili.co/api/v1/query_range'
        //         break;
        //     case 'kingsoft_main':
        //         var query_url = 'http://120.92.79.212:9090/api/v1/query_range'
        //         break;
        // }
        switch (datasource) {
            default:
                var query_url = "http://localhost:9090/api/v1/query_range"
                break;
            case 'shsb':
                var query_url = 'http://172.18.20.56:9090/api/v1/query_range'
                break;
            case 'backup':
                var query_url = 'http://172.18.20.170:9090/api/v1/query_range'
                break;
            case 'mysql':
                var query_url = 'http://172.18.20.79:9090/api/v1/query_range'
                break;
            case 'shjd':
                var query_url = 'http://172.24.20.18:9090/api/v1/query_range'
                break;
            case 'jssz':
                var query_url = 'http://10.69.66.13:9090/api/v1/query_range'
                break;
            case 'hzxs':
                var query_url = 'http://hzxs.prometheus.bilibili.co/api/v1/query_range'
                break;
            case 'hzxs_other':
                var query_url = 'http://172.19.3.58:9090/api/v1/query_range'
                break;
            case 'shylf':
                var query_url = 'http://shylf.prometheus.bilibili.co/api/v1/query_range'
                break;
            case 'bak':
                var query_url = 'http://bak-prometheus.bilibili.co/api/v1/query_range'
                break;
            case 'docker':
                var query_url = 'http://docker.prometheus.bilibili.co/api/v1/query_range'
                break;
            case 'app':
                var query_url = 'http://app.prometheus.bilibili.co/api/v1/query_range'
                break;
            case 'tencent_main':
                var query_url = 'http://main.tx.prometheus.bilibili.co/api/v1/query_range'
                break;
            case 'tencent_game':
                var query_url = 'http://10.29.0.16:9090/api/v1/query_range'
                break;
            case 'kingsoft_main':
                var query_url = 'http://120.92.79.212:9090/api/v1/query_range'
                break;
            case 'aliyun_cdn':
                var query_url = 'http://172.26.73.77:9090/api/v1/query_range'
                break;
            case 'aliyun_main':
                var query_url = 'http://172.26.73.206:9090/api/v1/query_range'
                break;
            case 'aliyun_game':
                var query_url = 'http://10.26.0.128:9090/api/v1/query_range'
                break;
            case 'cds':
                var query_url = 'http://146.196.58.52:9090/api/v1/query_range'
                break;
            case 'huawei':
                var query_url = 'http://122.112.219.69:9090/api/v1/query_range'
                break;
            case 'ucloud':
                var query_url = 'http://103.98.17.167:9090/api/v1/query_range'
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
