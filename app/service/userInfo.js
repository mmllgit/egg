"use strict";

const Service = require("egg").Service;

class userInfo extends Service {
  async findOne(user_number) {
    const result = await this.app.mysql.get("user_info", { user_number });
    return result;
  }

  async addOne(user_name, user_number, user_password) {
    const result = await this.app.mysql.insert("user_info", {
      user_name,
      user_number,
      user_password,
    });
    return result;
  }

  async updateOne(user_number, user_name, user_sign) {
    const options = {
      where: {
        user_number,
      },
    };
    const userInfo = {
      user_sign,
      user_number,
      user_name,
    };
    const result = await this.app.mysql.update("user_info", userInfo, options);
    return result;
  }

  async updateHead(user_number, user_head) {
    const options = {
      where: {
        user_number,
      },
    };
    const userInfo = {
      user_number,
      user_head,
    };
    const result = await this.app.mysql.update("user_info", userInfo, options);
    return result;
  }

  async removeOne(user_number) {
    const result = await this.app.mysql.delete("user_info", {
      user_number,
    });
    return result;
  }
}

module.exports = userInfo;
