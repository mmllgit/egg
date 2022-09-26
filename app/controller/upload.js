"use strict";

const Controller = require("egg").Controller;
const fs = require("fs");
const path = require("path");
const pump = require("mz-modules/pump");

class upload extends Controller {
  async upload() {
    const { ctx, app } = this;
    const user_number = await ctx.service.verifyToken.verifyToken();
    const file = ctx.request.files[0];
    const extname = path.extname(file.filename);
    const targetPath = path.join("app/public/userHead", user_number + extname);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);
    try {
      await pump(source, target);
      ctx.body = {
        code: 200,
        msg: "上传成功",
        data: {
          url: `${app.config.Url}/public/userHead/${user_number + extname}`,
        },
      };
    } catch (err) {
      ctx.body = {
        code: 200,
        msg: "上传失败",
        data: err,
      };
    }
  }
}

module.exports = upload;
