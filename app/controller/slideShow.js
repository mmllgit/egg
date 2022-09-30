"use strict";

const Controller = require("egg").Controller;
const fs = require("fs");
const pump = require("mz-modules/pump");
const path = require("path");

class SlideShow extends Controller {
  async getSlideShowImage() {
    const { ctx, app } = this;
    const files = fs.readdirSync("app/public/slideShow", (err, files) => {
      return new Promise((resolve, reject) => {
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    });
    if (Array.isArray(files)) {
      const fileList = files.map((file) => {
        return `${app.config.Url}/slideShow/${file}`;
      });
      ctx.body = {
        code: 200,
        msg: "获取成功",
        data: {
          fileList,
          files: files,
        },
      };
      return;
    }
    ctx.body = {
      code: 400,
      msg: "获取失败",
      data: null,
    };
  }

  async deleteImage() {
    const { ctx } = this;
    const { deleteList } = ctx.request.body;
    deleteList.map((deleteUrl) => {
      fs.rmSync(`app/public/slideShow/${deleteUrl}`, { force: true }, (err) => {
        return new Promise((resolve, reject) => {
          if (err) {
            reject(err);
          }
        });
      });
    });
    ctx.body = {
      code: 200,
      msg: "删除成功",
      data: null,
    };
  }

  async uploadSlideImage() {
    const { ctx } = this;
    const { files } = ctx.request;
    try {
      files.map(async (file) => {
        const targetPath = path.join("app/public/slideShow", file.filename);
        const source = fs.createReadStream(file.filepath);
        const target = fs.createWriteStream(targetPath);
        await pump(source, target);
      });
    } catch (err) {
      ctx.body = {
        code: 400,
        msg: "上传失败",
        data: err,
      };
    }
    ctx.body = {
      code: 200,
      msg: "上传成功",
      data: null,
    };
  }
}

module.exports = SlideShow;
