'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class AuthService extends Service {
  //业务token
  async getToken(user_id) {
    const secretOrPrivateKey = this.app.config.token_key; // 密钥
    const secretOrPrivateSign = this.app.config.token_sign; // 签名
    const time_out = this.app.config.token_exp_time;  //token有效时间
    const auth_data = { "uid": user_id, "sign": secretOrPrivateSign };
    const content = { key: auth_data }; // 要生成token的加密信息
    const token = jwt.sign(content, secretOrPrivateKey, { expiresIn: time_out }); // 创建token
    return token;
  }

  //获取token
  async getRfToken(user_id) {
    const secretOrPrivateKey = this.app.config.token_key; // 密钥
    const secretOrPrivateSign = this.app.config.token_rf_sign; // 签名
    const time_out = this.app.config.token_rf_exp_time;  //token有效时间
    const auth_data = { "uid": user_id, "sign": secretOrPrivateSign };
    const content = { key: auth_data }; // 要生成token的加密信息
    const token = jwt.sign(content, secretOrPrivateKey, { expiresIn: time_out }); // 创建token
    return token;
  }
}

module.exports = AuthService;
