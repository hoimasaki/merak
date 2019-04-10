/*=============================================================================
#     FileName: GetResourceUsageSummary.js
#         Desc: 
#       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-03-08 11:29:54
#      History:
=============================================================================*/
'use strict'
var ApiMethod = require(API_PATH + "/kernel/ApiMethod")
var Func = require(API_PATH + "/kernel/Func")
var redis = require(API_PATH + '/kernel/Redis')
var mysql = require(API_PATH + '/kernel/MySql')
var fibers = require("fibers")
var _ = require("underscore")
var moment = require("moment");
var util = require('util');
var db = new mysql(config.mysql_bilimoni)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var StartDate = self.input.StartDate;
        var EndDate = self.input.EndDate;
        var Dep = self.input.Dep;
        var Pro = self.input.Pro;
        var Type = self.input.Type;

        //入参验证
        if (!this.checkParams(['StartDate', 'EndDate'])) {
            return;
        }

        //Default
        Type === undefined ? Type='physical' : Type=self.input.Type 


        var dep_condition = ""
        _.each(Dep,function(row){
            dep_condition+= "'"+row+"',"
        })
        dep_condition=dep_condition.substr(0, dep_condition.length - 1)

		 var pro_condition = ""
         _.each(Pro,function(row){
         	pro_condition+= "'"+row+"',"
         })
        pro_condition=pro_condition.substr(0, pro_condition.length - 1)


        var condition = ""
        if (Dep != undefined) {
            condition += util.format(" AND owt in (%s)", dep_condition)
        }
        if (Pro != undefined) {
            condition += util.format(" AND pro in (%s)", pro_condition)
        }


    var avg_sql = util.format("SELECT COUNT(DISTINCT instance_name) AS count  ,\
    FORMAT(avg(avg_cpu_usage) , 2) AS cpu_usage ,\
    FORMAT(avg(max_cpu_usage) , 2) AS max_cpu_usage ,\
    FORMAT(avg(avg_mem_usage_nocache) , 2) AS mem_without_cache ,\
    FORMAT(avg(max_mem_usage_nocache) , 2) AS max_mem_without_cache ,\
    UNIX_TIMESTAMP(start_time) AS date ,\
    FORMAT(avg(avg_mem_usage) , 2) AS mem_with_cache ,\
    FORMAT(avg(max_mem_usage) , 2) AS max_mem_with_cache ,\
    FORMAT(avg(avg_iowait) , 2) AS iowait ,\
    FORMAT(avg(max_iowait) , 2) AS max_iowait ,\
    FORMAT(avg(avg_iops) , 2) AS ipos ,\
    FORMAT(avg(max_iops) , 2) AS max_ipos ,\
    FORMAT(avg(avg_network_in) , 2) AS network_in ,\
    FORMAT(avg(max_network_in) , 2) AS max_network_in ,\
    FORMAT(avg(avg_network_out) , 2) AS network_out ,\
    FORMAT(avg(max_network_out) , 2) AS max_network_out \
    FROM ( SELECT * FROM system_usage_daily WHERE start_time >= '%s' AND end_time <='%s' AND type = '%s'   %s) AS temp WHERE avg_cpu_usage >= 0",StartDate,EndDate,Type,condition)


        var Data = db.query(avg_sql);

        self.output.Dep = Dep;
        self.output.Pro = Pro;
        self.output.RetCode = 0
        self.output.Sets = Data;


    }
})
