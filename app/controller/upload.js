"use strict";

const Controller = require("egg").Controller;
const fs = require("fs");
const path = require("path");
const pump = require("mz-modules/pump");
class upload extends Controller {
  //更改头像
  async updateHead() {
    const { ctx, app } = this;
    const user_number = await ctx.service.verifyToken.verifyToken();
    const file = ctx.request.files[0];
    const extname = path.extname(file.filename);
    const targetPath = path.join("app/public/userHead", user_number + extname);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);
    try {
      await pump(source, target);
      const result = await ctx.service.userInfo.updateHead(
        user_number,
        `${app.config.Url}/userHead/${user_number + extname}`
      );
      if (result.affectedRows === 1) {
        ctx.body = {
          code: 200,
          msg: "上传成功",
          data: {
            headUrl: `${app.config.Url}/userHead/${user_number + extname}`,
          },
        };
      } else {
        ctx.body = {
          code: 400,
          msg: "上传失败",
          data: err,
        };
      }
    } catch (err) {
      ctx.body = {
        code: 400,
        msg: "上传失败",
        data: err,
      };
    }
  }
}

module.exports = upload;
