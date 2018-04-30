'use strict';

// had enabled by egg
// exports.static = true;

//数据库
exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};


//跨域
exports.cors = {
    enable: true,
    package: 'egg-cors',
};


//加密
exports.bcrypt = {
    enable: true,
    package: 'egg-bcrypt'
};



