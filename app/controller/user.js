'use strict';

const Controller = require('./base/baseController');

class UserController extends Controller {
  constructor(ctx) {
    super(ctx)

  }


  // 创建用户
  async create() {
    const { ctx, service } = this
    // 组装参数
    let payload = this.getRequest()
    payload.password = await this.ctx.genHash(payload.password)
    // 调用 Service 进行业务处理
    const res = await service.user.create(payload)
    // 设置响应内容和响应状态码
    this.success(res)
  }

  // 删除单个用户
  async destroy() {
    const { ctx, service } = this
    const { id } = this.getRequest()
    // 调用 Service 进行业务处理
    await service.user.delete(id)
    // 设置响应内容和响应状态码
    this.success()
  }

  // 修改用户
  async update() {
    const { ctx, service } = this
    // 组装参数
    const payload = this.getRequest()
    // 调用 Service 进行业务处理
    await service.user.update(payload, payload.id)
    // 设置响应内容和响应状态码
    this.success()
  }

  // 获取单个用户
  async show() {
    const { ctx, service } = this
    // 组装参数
    // const { id } = this.getRequest()
    const id = ctx.locals.uid
    // 调用 Service 进行业务处理
    const res = await service.user.find(id)
    // 设置响应内容和响应状态码
    this.success(res)
  }

  // 获取所有用户(分页/模糊)
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = this.getRequest()
    // 调用 Service 进行业务处理
    // const res = await service.user.index(payload)
    // 设置响应内容和响应状态码
    // this.success(res)
  }

  // 删除所选用户(条件id[])
  // async removes() {
  //   const { ctx, service } = this
  //   // 组装参数
  //   const { id } = this.getRequest()
  //   const payload = id.split(',') || []
  //   // 调用 Service 进行业务处理
  //   const result = await service.user.removes(payload)
  //   // 设置响应内容和响应状态码
  //   this.success(result)
  // }


  async remove() {
    const { ctx, service } = this
    // 组装参数
    const { id } = this.getRequest()
    // 调用 Service 进行业务处理
    const result = await service.user.delete(id)
    // 设置响应内容和响应状态码
    this.success(result)
  }


}


module.exports = UserController