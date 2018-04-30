'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525048860488_9987';

  // add your config here
  config.middleware = [];



  //到生产部署要改
  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'afeng-eggjs',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };


  //接口不需要csrf防御，禁用
  config.security = {
    csrf: {
      enable: false,
    },
  }


  config.uploadDir = 'uploads'; //资源文件上传目录（最终上传到app/public/uploads）
  //文件上传白名单
  config.multipart = {
    whitelist: [
      '.jpg',
      '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
    ],
    fileSize: '5mb', //大小限制
  }

  //密码加密强度
  config.bcrypt = {
    saltRounds: 10 // default 10
  }


  //token设置
  config.token_key = 'afeng-eggjs';  //token密钥，盐值
  config.token_sign = 'afeng-token'; //token 签名，用来验证客户端发来的token
  config.token_exp_time = 60 * 30;  //token有效时间30分钟，例如24小时 60 * 60 * 24 
  config.token_rf_sign = 'afeng-rftoken'; //刷新rftoken
  config.token_rf_exp_time = 60 * 60 * 24 * 30;  //token刷新有效时间1个月，例如24小时 60 * 60 * 24 



  return config;
};
