'use strict';

const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    const _id = this.ctx.locals.uid;
    return _id;
  }

  success(data = null, code = 0, msg = 'ok') {
    this.ctx.body = {
      code,
      msg,
      data,
    };
    this.ctx.status = 200
  }

  notFound(data = null, code = 1, msg = 'not found') {
    this.ctx.body = {
      code,
      msg,
      data,
    };
    this.ctx.status = 404
  }


  getRequest(key = '') {
    const params = this.ctx.query || this.ctx.params || this.ctx.request.body || {}
    if (params == {}) {
      ctx.throw(400, '无法获取请求参数')
    }
    return key == '' ? params : params[key]
  }

}
module.exports = BaseController;