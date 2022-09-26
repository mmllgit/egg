"use strict";

const Service = require("egg").Service;

class verifyToken extends Service {
  async verifyToken() {
    const { ctx, app } = this;
    const { jwt } = app;
    const token = ctx.header.authorization.split(" ")[1];
    let user_number;
    jwt.verify(token, app.config.secret, (err, data) => {
      if (err) {
        return (ctx.body = {
          code: 400,
          msg: "token错误",
          data: err,
        });
      }
      user_number = data.user_number;
    });
    return user_number;
  }
}

module.exports = verifyToken;
