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

const genTopSql = ( itemName, StartTime, EndTime, condition ) => {
  return `SELECT COUNT(*) as count, ${itemName} as item
      FROM event
      WHERE type = 'alert'
      AND begin_at >= '${StartTime}' AND begin_at < '${EndTime}'
      AND ${itemName} IS NOT NULL
      AND ${itemName} != ''
      AND ${itemName} != 'None'
      ${condition}
      GROUP BY ${itemName}
      ORDER BY count DESC
      LIMIT 15;`
};

module.exports = ApiMethod.extend({
  process: function() {
    let self = this;
    const format = 'YYYY-MM-DD HH:mm:ss';
    //默认展示最近一天
    let StartTime = self.input.StartTime || new Date().getTime() - 24 * 3600 * 1000;
    let EndTime = self.input.EndTime || new Date().getTime();
    let Status = self.input.Status;


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

    let condition = "";
    if (Status) {
      condition += util.format(" AND status='%s'", Status)
    }

    const userSql = `SELECT ue.user_id, count(*) AS cnt
      FROM user_events AS ue
      LEFT JOIN event AS e ON ue.event_id = e.id
      WHERE e.type = 'alert'
      AND e.begin_at >= '${StartTime}' AND e.begin_at < '${EndTime}'
      AND ue.user_id IS NOT NULL
      ${condition}
      GROUP BY ue.user_id
      ORDER BY cnt DESC
      LIMIT 15;`;

    const userIdAndCount = db.query(userSql);
    const ids = userIdAndCount.map(_data => _data.user_id);
    let eventGroupByUser = [];
    if ( ids.length ) {
      const usernameSql = util.format("SELECT realname, id FROM user WHERE id IN (%s)", ids.join());
      const users = db.query(usernameSql);
      eventGroupByUser = userIdAndCount.map(obj => {
        const user = users.find(user => user.id === obj.user_id);
        return {
          item: user ? user.realname : null,
          count: obj.cnt,
        };
      });
    }

    const eventGroupByInstance = db.query(genTopSql('instance_name', StartTime, EndTime, condition)) || [];
    const eventGroupByStKey = db.query(genTopSql('st_key', StartTime, EndTime, condition)) || [];
    const eventGroupByLevel = db.query(genTopSql('severity', StartTime, EndTime, condition)) || [];

    self.output.RetCode = 0;
    self.output.Sets = [
      {
        name: '按实例排名',
        data: eventGroupByInstance,
      },
      {
        name: '按业务排名',
        data: eventGroupByStKey,
      },
      {
        name: '按通知人排名',
        data: eventGroupByUser,
      },
      {
        name: '按告警等级排名',
        data: eventGroupByLevel,
      }
    ];
  }
});
