'use strict'
const fs = require('fs')
const path = require('path')
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const download = require('image-downloader')
const Controller = require('./base/baseController')

class UserAccessController extends Controller {

  constructor(ctx) {
    super(ctx)

  }

  // 用户登入
  async login() {
    const { ctx, service } = this
 
    // 组装参数
    const payload = this.getRequest()

    // 调用 Service 进行业务处理
    const res = await service.userAccess.login(payload)
    // 设置响应内容和响应状态码
    this.success(res)
  }

  // 用户登出
  async logout() {
    const { ctx, service } = this
    // 调用 Service 进行业务处理
    await service.userAccess.logout()
    // 设置响应内容和响应状态码
    this.success()
  }

  // 修改密码
  async resetPsw() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.userAccess.resetPsw(payload)
    // 设置响应内容和响应状态码
    this.success()
  }



}

module.exports = UserAccessController
