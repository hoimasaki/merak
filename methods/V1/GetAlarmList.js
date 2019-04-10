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

module.exports = ApiMethod.extend({
  process: function () {
    var self = this;
    const format = 'YYYY-MM-DD HH:mm:ss';
    //默认展示最近一天
    var StartTime = self.input.StartTime || new Date().getTime() - 24 * 3600 * 1000;
    var EndTime = self.input.EndTime || new Date().getTime();

    var Product = self.input.Product;
    var InstanceGroup = self.input.InstanceGroup;
    var Instance = self.input.Instance;
    var Page = self.input.Page || 1;
    var PageSize = self.input.PageSize || 10;
    var Status = self.input.Status;
    var Level = self.input.Level;
    var SortBy = self.input.SortBy;
    var Order = self.input.Order || 'desc';

    //入参验证
    if (CheckIntOrIntString(StartTime)) {
      StartTime = moment(parseInt(StartTime)).format(format);
    } else {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['StartTime']);
      return;
    }

    if (CheckIntOrIntString(EndTime)) {
      EndTime = moment(parseInt(EndTime)).format(format);
    } else {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['EndTime']);
      return;
    }

    if (!checkStatusAvailable(Status)) {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['Status']);
      return;
    }

    if (SortBy && !['level', 'time'].includes(SortBy)) {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['SortBy']);
      return;
    }

    if (Order && !['asc', 'desc'].includes(Order)) {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['Order']);
      return;
    }

    //入参InstanceGroup不能以"/"分割
    if ( InstanceGroup && InstanceGroup.indexOf('/') > -1) {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['InstanceGroup']);
      return;
    }

    if ( !CheckIntOrIntString(Page) || parseInt(Page) < 1 ) {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['Page']);
      return;
    }

    if ( !CheckIntOrIntString(PageSize) || parseInt(PageSize) < 1 ) {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['PageSize']);
      return;
    }

    if (Level && !(Level instanceof Array)) {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['Level']);
      return;
    }

    //条件拼接
    let condition = "";
    if (Status) {
      condition += ` AND status='${Status}'`
    }

    if (Product) {
      condition += ` AND product_name='${Product}'`
    }

    if (Instance) {
      condition += ` AND instance_name='${Instance}'`
    }

    if (Level && Level.length) {
      condition += ` AND severity IN ('${Level.join("','")}')`
    }

    if (InstanceGroup) {
      let concatedInstanceGroup = InstanceGroup;
      if (concatedInstanceGroup.indexOf('.') > -1) {
        concatedInstanceGroup = `/${InstanceGroup.split('.').join('/')}/`;
      }
      condition += ` AND (st_key='${InstanceGroup}' OR st_key='${concatedInstanceGroup}')`
    }

    let orderBy = "ORDER BY level ASC, time DESC";
    if(SortBy){
      orderBy = `ORDER BY ${SortBy} ${Order}`
    }

    const listSql = `SELECT id,
      product_name,
      st_key AS instance_group_name,
      instance_name,
      status,
      severity AS level,
      begin_at AS time,
      labels_str AS labels,
      rule,
      ack,
      message,
      event_name,
      event_description FROM event
      WHERE type = 'alert'
      AND begin_at >= '${StartTime}' AND begin_at < '${EndTime}'
      ${condition}
      ${orderBy}
      LIMIT ${parseInt(PageSize)}
      OFFSET ${(parseInt(Page) - 1) * parseInt(PageSize)};`;

    let data = db.query(listSql);

    const totalSql = `SELECT COUNT(*) AS total FROM event 
      WHERE type = 'alert'
      AND begin_at >= '${StartTime}' AND begin_at < '${EndTime}'
      ${condition};`;

    const total = db.query(totalSql);

    self.output.RetCode = 0;
    self.output.Sets = data;
    self.output.Page = parseInt(Page);
    self.output.PageSize = parseInt(PageSize);
    self.output.Count = total[0].total;
  }
});
