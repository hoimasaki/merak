var _ = require("underscore");
var util = require("util");
var moment = require("moment");
var Func = require("./Func");
var redis = require('./Redis');
var config = require('../config/config.json')[ENV];
var mysql = require(API_PATH + "/kernel/MySql");
var db = new mysql(config.mysql);
var redis_conn = new redis(config.redis);

function ApiLoader(params, res, task) {
    var self = this;
    self.task = task;
    self.params = params;
    self.res = res;
    self.version = "V1";

    var public_key = '9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubtuhui@bilibili.com'


    //配置无需验签的接口
    switch (self.params.Action) {
        case 'GetSign':
            self.params.PublicKey = public_key
            //跳过验证
            var noskip_verfyAC = false
            break;
        case 'AlertManagerCallBack':
            self.params.PublicKey = public_key
            var noskip_verfyAC = false
            break;
        case 'OpsMindCallBack':
            self.params.PublicKey = public_key
            //跳过验证
            var noskip_verfyAC = false
            break;
        case 'OpsMindCallBackNew':
            self.params.PublicKey = public_key
            //跳过验证
            var noskip_verfyAc = false
            break;
        case 'WechatLogin':
            self.params.PublicKey = public_key
            var noskip_verfyAC = false
            break;
        case undefined:
            self.res.json(Func.generateErrorCode("MISSING_ACTION"))
            return false
        default:
            //公共参数返回判断
            var noskip_verfyAC = true
            if (self.params.Signature == undefined) {
                self.res.json(Func.generateErrorCode("MISSING_PARAMS", ["Signature"]))
                return false;
            }
            if (self.params.PublicKey == undefined) {
                self.res.json(Func.generateErrorCode("MISSING_PARAMS", ["PublicKey"]))
                return false;
            }
    }



    //公私钥验证
    var redis_private_key_res = redis_conn.get(self.params.PublicKey)
    var private_key = ""

    //从Redis获取私钥
    if (redis_private_key_res == null) {
        var sql = util.format('SELECT private_key FROM t_member WHERE public_key="%s" LIMIT 1', self.params.PublicKey)
        var dbres = db.query(sql)
        if (!dbres[0]) {
            self.res.json(Func.generateErrorCode("VERIFY_FAIL"))
            return false;
        }
        private_key = dbres[0].private_key
        redis_conn.setttl(self.params.PublicKey, private_key, 8 * 60 * 60)
    } else {
        private_key = redis_private_key_res
    }

    //配置验签，掠过特殊Action
    var signature_verification = config.signature_verification;
    var verfyAC = signature_verification && noskip_verfyAC ? self.verfyAC(self.params, private_key) : true;


    //验签
    if (verfyAC) {
        try {
            var start_time = moment().unix() * 1000 + moment().milliseconds();

            var action_path = util.format("%s/%s/%s", '../methods', self.version, self.params["Action"]);

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
    //验签不通过
    else {
        self.res.json(Func.generateErrorCode("VERIFY_FAIL"));
    }

}

ApiLoader.prototype.verfyAC = function(params, private_key) {
    var signature = params['Signature'],
        params_data = "";
    delete params['Signature'];
    var params = Func.keySort(params);
    for (key in params) {
        params_data += key;
        params_data += params[key];
    }
    if (signature == Func.sha1(params_data + private_key)) {
        return true;
    }
    return false;
}



module.exports = ApiLoader;
