var log4js = require("log4js")
var util = require('util')
var _ = require('underscore')
var moment = require("moment")
var billions = require('@bilibili/vikingr/lib')

var Log = function() {

    var logger = log4js.getLogger();
    var billions_log = {}
    billions_log.app_id = 'ops.bilimoni.merak'
    billions_log.time = moment().toISOString()
    //调试开关
    billions_log.print = false

    this.info = function(log) {
        var log = _.extend(billions_log,log)
        logger.level = 'info'
        log.level = "info"
        //log4js输出
        //logger.info(log)
        billions.log(log)
    }
    this.debug = function(log) {
        var log = _.extend(billions_log,log)
        log.level = 'debug'
        logger.level = 'debug'
        //log4js输出
        //logger.debug(log)
        billions.log(log)
    }
    this.error = function(log) {
        var log = _.extend(billions_log,log)
        log.level = 'error'
        logger.level = 'error'
        //log4js输出
        //logger.error(log)
        billions.log(log)
    }
    this.warn = function(log) {
        var log = _.extend(billions_log,log)
        log.level = 'WARN'
        logger.level = 'warn'
        //log4js输出
        //logger.warn(log)
        billions.log(log)
    }

}


module.exports = Log
