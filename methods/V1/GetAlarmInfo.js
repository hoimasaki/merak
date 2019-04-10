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
var moniDb = new mysql(config.mysql_bilimoni);

module.exports = ApiMethod.extend({
  process: function () {
    const self = this;
    let Id = self.input.Id;
    const Instance = self.input.InstanceName;
    let Rule = self.input.Rule;

    //入参验证
    if (!Id && Id !== 0) {
      self.output = Func.generateErrorCode("MISSING_PARAMS", ['Id']);
      return;
    }

    try{
      Id = parseInt(Id);
      if(isNaN(Id)){
        self.output = Func.generateErrorCode("PARAMS_ERROR", ['Id']);
        return;
      }
    } catch (e) {
      self.output = Func.generateErrorCode("PARAMS_ERROR", ['Id']);
      return;
    }

    if (!Instance) {
      self.output = Func.generateErrorCode("MISSING_PARAMS", ['InstanceName']);
      return;
    }

    // if (!Rule && Rule !== 0) {
    //   self.output = Func.generateErrorCode("MISSING_PARAMS", ['Rule']);
    //   return;
    // }
    //
    // try{
    //   Rule = parseInt(Rule);
    //   if(isNaN(Rule)){
    //     self.output = Func.generateErrorCode("PARAMS_ERROR", ['Rule']);
    //     return;
    //   }
    // } catch (e) {
    //   self.output = Func.generateErrorCode("PARAMS_ERROR", ['Rule']);
    //   return;
    // }


    // const alarmGroupSql = `SELECT id,
    //   groupname FROM alarm_rule_alarm_group AS arag
    //   LEFT JOIN alarm_group AS a ON arag.alarm_group_id = a.id
    //   WHERE arag.alarm_rule_id = ${Rule};`;

    const userSql = `SELECT u.id, username,
      realname FROM user AS u
      LEFT JOIN user_events AS ue ON u.id = ue.user_id
      WHERE ue.event_id = ${Id};`;

    const instanceSql = `SELECT id AS instance_id, instance_name,
      instance_label,
      instance_target,
      outer_instance_target,
      idc FROM instance
      WHERE instance_name = '${Instance}';`;

    // const alarmGroups = moniDb.query(alarmGroupSql);
    const users = db.query(userSql);
    const instanceData = moniDb.query(instanceSql);

    self.output.RetCode = 0;
    self.output.Sets = {
      instance: instanceData[0] || {},
      // alarmGroups: alarmGroups,
      users: users
    }
  }
});
