const fs = require('fs')
const path = require('path')
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const Service = require('./baseService')

class UploadService extends Service {


  constructor(ctx) {
    super(ctx)
    this.table_name = 'af_attachment';
    this.upload_dir = this.app.config.uploadDir;
  }


  async destroy(_id) {
    const { ctx, service } = this

    const attachment = await this.find(_id)

    if (!attachment) {
      ctx.throw(404, '资源不存在')
    } else {
      const target = path.join(this.config.baseDir, `app/public/${this.upload_dir}`, `${attachment.filename}`)
      fs.unlinkSync(target)
    }
    const result = await this.delete(_id);
    return result
  }

  // update 先删除旧文件再上传新文件
  async updatePre(_id) {
    const { ctx, service } = this
    const attachment = await this.find(_id)
    if (!attachment) {
      ctx.throw(404, '资源不存在')
    } else {
      const target = path.join(this.config.baseDir, `app/public/${this.upload_dir}`, `${attachment._id}${attachment.extname}`)
      fs.unlinkSync(target)
    }
    return attachment
  }

  async extra(_id, values) {
    const { ctx, service } = this
    const attachment = await this.find(_id)
    if (!attachment) {
      ctx.throw(404, 'attachment not found')
    }
    const { affectedRows } = await this.update(values, options);
    return affectedRows;
  }


  async show(_id) {
    const attachment = await this.find(_id)
    if (!attachment) {
      this.ctx.throw(404, 'attachment not found')
    }
    return attachment
  }


}

module.exports = UploadService