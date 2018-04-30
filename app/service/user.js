'use strict';

const Service = require('./base/baseService');

class UserService extends Service {
  constructor(ctx) {
    super(ctx)
    this.table_name = 'af_user';
  }

  async findByName(where) {
    return await this.findByWhere({ username: where })
  }

}

module.exports = UserService;
