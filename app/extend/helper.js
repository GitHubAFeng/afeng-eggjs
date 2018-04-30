'use strict';

const moment = require('moment');


moment.locale('zh-cn'); // 使用中文

// 多久之前  例如 moment([2007, 0, 29]).fromNow(); // 4 years ago
// 使用 ctx.helper.moment_ago(时间截)
exports.moment_ago = function (date) {
  date = moment(this.moment_timestring(date));
  return date.fromNow();
};


// 多久之后  例如 moment([2007, 0, 29]).toNow();     // in 4 years
exports.moment_in = function (date) {
  date = moment(this.moment_timestring(date));
  return date.toNow();
};

// 获取当前时间截或指定时间
exports.moment_timestamp = function (date = '') {
  return date == '' ? moment().unix() : moment().unix(date);
};

// 时间截获取时间
exports.moment_timestring = function (timeStamp, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(timeStamp * 1000).format(format);
};

//===========================================================//

