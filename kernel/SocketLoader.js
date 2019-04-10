var _ = require("underscore");
var util = require("util");
var moment = require("moment");
var Func = require("./Func");
var redis = require('./Redis');
var config = require('../config/config.json')[ENV];
var mysql = require(API_PATH + "/kernel/MySql");
var db = new mysql(config.mysql);
var redis_conn = new redis(config.redis);


function SocketLoader(params, res, task) {
    var self = this;
    self.task = task;
    self.params = params;
    self.res = res;
    self.version = "V1";


    try {
        var start_time = moment().unix() * 1000 + moment().milliseconds();

        var action_path = util.format("%s/%s/%s", '../socket_methods', self.version, self.params["SocketAction"]);

        var method = require(action_path);

        var obj_method = new method(self.params, self.task)


        //Run
        obj_method.process();
        self.res.json(obj_method.output);


        //API LOG
        var end_time = moment().unix() * 1000 + moment().milliseconds();
        var execute_time = end_time - start_time;

        var log_output = {}
        log_output.Req = self.params
        log_output.Res = obj_method.output
        log_output.ExecuteTime = execute_time
        log_output.RequestNumber = REQUEST_NUMBER
        log_output.Version = self.version

        //Print Log
        logger.info(log_output)

    } catch (e) {
        console.log(e)
        if (e.code === 'MODULE_NOT_FOUND') {
            self.res.json(Func.generateErrorCode("MISSING_ACTION"))
        } else {
            logger.error("SERVICE_ERROR:" + e);
            self.res.json(Func.generateErrorCode("SERVICE_ERROR"));
        }
    }

}



module.exports = SocketLoader;
