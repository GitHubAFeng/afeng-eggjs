'use strict';

const Service = require('egg').Service;

class BaseService extends Service {

  constructor(ctx) {
    super(ctx)
    this.table_name = '';
  }

  get tableName() {
    if (this.table_name == '') throw (500, '表名不能为空')
    return this.table_name;
  }

  set tableName(_name) {
    this.table_name = _name;
  }

  async find(_id) {
    const result = await this.app.mysql.get(this.tableName, { id: _id });
    return result;
  }

  async findByWhere(options) {
    const result = await this.app.mysql.get(this.tableName, options);
    return result;
  }


  async create(values) {
    const timestamp = this.ctx.helper.moment_timestamp();    // 当前时间戳
    const obj = Object.assign({
      created_at: timestamp
    }, values);
    const { insertId } = await this.app.mysql.insert(this.tableName, obj);
    return insertId;
  }


  async update(values, _id) {
    const timestamp = this.ctx.helper.moment_timestamp();    // 当前时间戳
    const data = Object.assign({
      update_at: timestamp
    }, values);
    const options = {
      where: {
        id: _id
      }
    };
    const { affectedRows } = await this.app.mysql.update(this.tableName, data, options);
    return affectedRows;
  }


  async delete(_id) {
    const result = await this.app.mysql.delete(this.tableName, { id: _id });
    return result
  }


}

module.exports = BaseService;
