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
var _db = new mysql(config.mysql)
var _cache = new redis(config.redis)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var host = self.input.Host

        //入参验证
        if (!this.checkParams(['Host'])) {
            return;
        }


        var prom_node = _db.select("prom_node", {
            "host": host
        })
        logger.debug(prom_node)


        var query_param = {
            'url': "http://"+prom_node[0].domain+"/api/v1/targets"
        }
        console.log(query_param)
        var prom_data = req.get_json(query_param)

        var result = []
        _.each(prom_data.data.activeTargets, function(row) {

            var push_data = {
                "address": row.discoveredLabels.__address__,
                "file": row.discoveredLabels.__meta_filepath,
                "job": row.discoveredLabels.job,
                "lastError": row.lastError,
                "lastScrape": row.lastScrape,
                "status": row.health
            }
            result.push(push_data)
        })

        self.output.RetCode = 0
        self.output.Sets = result;

    }
})
