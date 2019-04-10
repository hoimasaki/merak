/*=============================================================================
#     FileName: createKey.js
#         Desc:
#       Author: Anakin Tu
#        Email: htu@sse.com.cn
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-03-08 10:56:45
#      History:
=============================================================================*/
var fibers = require('fibers')
var util = require("util")
var sha1 = require('sha1')
var mysql = require("../kernel/MySql")
var config = require("../config/config.json")['production']
var _db = new mysql(config.mysql)

fibers(function() {

    var username = 'ganpengfei@bilibili.com'
    var public_key = sha1("merak") + "tracehub" + username
    var private_key = sha1(username + sha1("merak") + "tracehub")

    var sql = util.format("insert into t_member (`user_email`,`public_key`,`private_key`) values('%s','%s','%s')", username, public_key, private_key);
    console.log(sql)
    var result = _db.query(sql)

    console.log(username)
    console.log("PublickKey:"+public_key)
    console.log("PrivateKey:"+private_key)
    process.exit()

}).run()
