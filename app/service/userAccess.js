'use strict'

const Service = require('./base/baseService')

class UserAccessService extends Service {


  async login(payload) {
    const { ctx, service } = this
    const user = await service.user.findByName(payload.username)
    if (!user) {
      return null;
    }
    let verifyPsw = await ctx.compare(payload.password, user.password)

    if (!verifyPsw) {
      ctx.throw(404, 'user password is error')
    }
    // 生成Token令牌
    const token = await service.base.auth.getToken(user.id)
    const rf_token = await service.base.auth.getRfToken(user.id)
    
    service.user.update({ token, rf_token }, user.id);

    return token
  }

  async logout() {
  }

  // 重置密码
  async resetPsw(values) {
    const { ctx, service } = this
    // ctx.state.user 可以提取到JWT编码的data
    const _id = ctx.state.user.data.id
    const user = await service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user is not found')
    }

    let verifyPsw = await ctx.compare(values.oldPassword, user.password)
    if (!verifyPsw) {
      ctx.throw(404, 'user password error')
    } else {
      values.password = await ctx.genHash(values.password)
      return service.user.findByIdAndUpdate(_id, values)
    }
  }


}

module.exports = UserAccessService
