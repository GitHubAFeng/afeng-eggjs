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



  async getList(values) {
    const { ctx } = this;
    const page_size = values.size;
    const page = values.page;
    const count_sql = `SELECT COUNT(*) FROM ${this.tableName} WHERE is_delete=0 `;
    const count = await this.app.mysql.query(count_sql);
    const page_total = Math.ceil(count / page_size);
    const page_num = page_total > 0 && page > page_total ? page_total : page;
    const page_start = page_size * (page_num - 1);
    // const sql = `SELECT * FROM ${this.tableName} WHERE is_delete=0 AND title like '%${key}%' order by create_time desc LIMIT ${page_start},${page_size}`;
    const sql = `SELECT * FROM ${this.tableName} WHERE is_delete=0 order by created_at desc LIMIT ${page_start},${page_size}`;
    let results = await this.app.mysql.query(sql);
    for (let i = 0; i < results.length; i++) {
        results[i].created_at = ctx.helper.moment_timestring(results[i].created_at);
    }
    return results;

}


}

module.exports = BaseService;
