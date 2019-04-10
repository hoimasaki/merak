/*=============================================================================
#     FileName: merak.js
#         Desc: 
#       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-03-08 11:29:04
#      History:
=============================================================================*/
var fibers = require("fibers");
var fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
var http = require('http').Server(app);
var util = require('util');
var log4js = require("log4js");
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var _ = require('underscore');
var mysql = require("./kernel/MySql");
var date = require("./kernel/Date");
var logjs = require("./kernel/Logger");
var cache = require("./kernel/Cache");
var Func = require("./kernel/Func");

global.ENV = app.get("env")
global.API_PATH = __dirname;
global.REQUEST_NUMBER = 0;
var ApiLoader = require("./kernel/ApiLoader.js");

config = require("./config/config.json")[ENV];

var today = date.date()

//加载日志模块
global.logger = new logjs(config)
//加载数据库查询缓存模块
global.cache = new cache(config)

logger.info(ENV)

// all environments
app.use(cors());
app.set('port', config.app_port);
app.use(express.json());
app.use(bodyParser.json({
    "limit": "100mb"
}));
app.use(express.urlencoded());
app.use(methodOverride())



//同时兼容各种请求格式
app.get("/", function(req, res) {
    fibers(function() {
        var self = this;
        try {
            new ApiLoader(req.query, res, self)
        } catch (err) {
            logger.error(err)
            res.json(Func.generateErrorCode("RETCODE_NOT_REGIST"))
        }
    }).run()
})

app.post("/", function(req, res) {
    fibers(function() {
        var self = this;
        try {
            new ApiLoader(req.body, res, self)
        } catch (err) {
            logger.error(err)
        }
    }).run()
})


app.all("/:Action", function(req, res, next) {
    fibers(function() {
        req.query.Action = req.params.Action
        req.body = _.extend(req.body, req.query)
        var self = this;
        new ApiLoader(req.body, res, self)
        next()
    }).run()
})


//Socket.io
because = require("./socket_method/Because")
var socket_method = new because(http)
socket_method.action()

http.listen(app.get('port'), function() {
    console.info("listening :" + app.get("port"));
})
