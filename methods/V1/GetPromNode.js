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
        var search = self.input.Search

        var sql = util.format("SELECT * FROM prom_node WHERE domain like '%"+search+"%' or host like '%"+search+"%' or ip like '%"+search+"%' or idc like '%"+search+"%' or remark like '%"+search+"%'")
        logger.debug(sql)
        var prom_node_list = _db.query(sql)

        self.output.RetCode = 0
        self.output.Sets = prom_node_list;

    }
})
