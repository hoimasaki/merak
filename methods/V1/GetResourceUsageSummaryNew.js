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
var db = new mysql(config.mysql)

module.exports = ApiMethod.extend({
    process: function() {
        var self = this
        var StartDate = self.input.StartDate;
        var EndDate = self.input.EndDate;
        var Dep = self.input.Dep;
        var Pro = self.input.Pro;


        //入参验证
        if (!this.checkParams(['StartDate', 'EndDate'])) {
            return;
        }

        
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

		
		  var avg_sql = util.format("SELECT count(*) AS count ,\
           FORMAT(avg(cpu_usage1) ,2) AS cpu_usage ,\
          FORMAT(avg(cpu_usage3) ,2) AS max_cpu_usage,\
          FORMAT(avg(mem_usage1) , 2) AS mem_without_cache ,\
          FORMAT(avg(mem_usage3) , 2) AS max_mem_without_cache ,\
          UNIX_TIMESTAMP(date) AS date ,\
          FORMAT(avg(mem_usage_with_cache1) , 2) AS mem_with_cache ,\
          FORMAT(avg(mem_usage_with_cache3) , 2) AS max_mem_with_cache ,\
          FORMAT(avg(iowait1) , 2) AS iowait ,\
          FORMAT(avg(iowait3) , 2) AS max_iowait ,\
          FORMAT(avg(max_iops1) , 2) AS ipos ,\
          FORMAT(avg(max_iops3) , 2) AS max_ipos ,\
          FORMAT(avg(network_in1) , 2) AS network_in ,\
          FORMAT(avg(network_in3) , 2) AS max_network_in ,\
          FORMAT(avg(network_out1) , 2) AS network_out ,\
          FORMAT(avg(network_out3) , 2) AS max_network_out \
            FROM (SELECT * FROM system_usage WHERE date >='%s' AND date<='%s' AND type = 'machine'  %s GROUP BY instance_name) AS temp", StartDate, EndDate, condition)
		
	
        var Data = db.query(avg_sql);

        self.output.Dep = Dep;
        self.output.Pro = Pro;
        self.output.RetCode = 0
        self.output.Sets = Data;


    }
})
