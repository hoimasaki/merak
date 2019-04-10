var Future = require('fibers/future');
var req = require('./Request');
var util = require('util');
var func = require('../kernel/Func');
var config = require("../config/config.json")['production']
var moment = require('moment');

var cmdb_base = function() {

    this.call = function(args) {
        args['token'] = config.cmdb.token
        //args['timestamp'] = moment().format('X')
        args['timestamp'] = '1539934065'
        args['secret']= config.cmdb.secret
        args['signature'] = func.cmdb_signature(args)
        delete args['secret']

        var params = {
            "url":"http://ops-cmdb.bilibili.co/api/tag/list/",
            "form":args
        }
        console.log(params)
        cmdb_result = req.post_json(params)
        console.log(cmdb_result)
        return cmdb_result 
    }


}

module.exports = cmdb_base
