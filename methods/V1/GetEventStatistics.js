'use strict';
var ApiMethod = require(API_PATH + "/kernel/ApiMethod");
var Func = require(API_PATH + "/kernel/Func");
var redis = require(API_PATH + '/kernel/Redis');
var mysql = require(API_PATH + '/kernel/MySql');
var fibers = require("fibers");
var _ = require("underscore");
var moment = require("moment");
var util = require('util');
var db = new mysql(config.mysql_bulbasaur);
const CheckIntOrIntString = Func.CheckIntOrIntString;
const checkStatusAvailable = Func.checkStatusAvailable;

const sqlFormat = {
  'hour': '%Y-%m-%d %H:00',
  'day': '%Y-%m-%d',
  'month': '%Y-%m',
  'year': '%Y'
};

const dateFormatForPrecision = {
  'hour': 'YYYY-MM-DD HH:00',
  'day': 'YYYY-MM-DD',
  'month': 'YYYY-MM',
  'year': 'YYYY'
};

const momentFlag = {
  'hour': 'h',
  'day': 'd',
  'month': 'M',
  'year': 'y'
};

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const precisionList = ['hour', 'day', 'month', 'year'];

module.exports = ApiMethod.extend({
  process: function(){
    var self = this;
    //默认展示最近一天
    var StartTime = self.input.StartTime || new Date().getTime() - 24 * 3600 * 1000;
    var EndTime = self.input.EndTime || new Date().getTime();
    var Status = self.input.Status;
    var Precision = precisionList.includes(self.input.Precision) ? self.input.Precision : 'hour';

    //入参验证
    if (CheckIntOrIntString(StartTime)) {
      StartTime = parseInt(StartTime);
    } else {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['StartTime']);
      return;
    }

    if (CheckIntOrIntString(EndTime)) {
      EndTime = parseInt(EndTime);
    } else {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['EndTime']);
      return;
    }

    if (!checkStatusAvailable(Status)) {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['Status']);
      return;
    }

    let condition = "";
    if (Status) {
      condition += ` AND status='${Status}'`;
    }

    const sql = `SELECT count(*) as count, 
    date_format(begin_at, '${sqlFormat[Precision]}') as time FROM event
    WHERE type = 'alert'
    AND begin_at >= '${moment(StartTime).format(dateFormat)}' AND begin_at < '${moment(EndTime).format(dateFormat)}'
    ${condition}
    GROUP BY time;`;

    const data = db.query(sql);
    const responseData = [];
    let time = moment(new Date(moment(StartTime).format(dateFormatForPrecision[Precision])));
    while (time.toDate().getTime() < EndTime) {
      const obj = data.find(d => d.time === time.format(dateFormatForPrecision[Precision]));
      if (obj) {
        responseData.push(obj);
      } else {
        responseData.push({
          count: 0,
          time: time.format(dateFormatForPrecision[Precision]),
        });
      }
      time.add(1, momentFlag[Precision])
    }

    self.output.RetCode = 0;
    self.output.Sets = responseData;
  }
});
