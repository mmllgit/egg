"use strict";

const Controller = require("egg").Controller;
const path = require("path");
const fs = require("fs");
const pump = require("mz-modules/pump");

class posts extends Controller {
  async postList() {
    const { ctx } = this;
    const result = await ctx.service.posts.getPostList();
    if (result) {
      ctx.body = {
        code: 200,
        msg: "获取成功",
        data: result,
      };
    } else {
      ctx.body = {
        code: 400,
        msg: "获取失败",
        data: null,
      };
    }
  }

  async releasePost() {
    const { ctx, app } = this;
    const { post_content } = ctx.request.body;
    const { files } = ctx.request;
    try {
      const len = files.length;
      const post_images = [];
      for (let i = 0; i < len; i++) {
        const file = files[i];
        const name = ctx.helper.uuid();
        const extname = path.extname(file.filename);
        const filename = name + extname;
        const targetPath = path.join("app/public/postImages", filename);
        const source = fs.createReadStream(file.filepath);
        const target = fs.createWriteStream(targetPath);
        await pump(source, target);
        post_images.push(`${app.config.Url}/postImages/${filename}`);
      }
      const post_image = ctx.helper.joinImage(post_images);
      const result = await ctx.service.posts.addPost(post_content, post_image);
      if (result.affectedRows === 1) {
        ctx.body = {
          code: 200,
          msg: "发布成功",
          data: null,
        };
        return;
      }
      ctx.body = {
        code: 400,
        msg: "发布失败",
        data: null,
      };
    } catch (err) {
      ctx.body = {
        code: 400,
        msg: "发布失败",
        data: err,
      };
    }
  }

  async likeStar() {
    const { ctx } = this;
    const { post_id } = ctx.request.body;
    const result = await ctx.service.posts.likeStar(post_id);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 200,
        msg: "操作成功",
        data: null,
      };
      return;
    }
    ctx.body = {
      code: 200,
      msg: "操作失败",
      data: null,
    };
  }

  async removePost() {
    const { ctx } = this;
    const { post_id } = ctx.request.body;
    const result = await ctx.service.posts.removePost(post_id);
    if (result && result.affectedRows === 1) {
      ctx.body = {
        code: 200,
        msg: "删除成功",
        data: null,
      };
      return;
    }
    ctx.body = {
      code: 400,
      msg: "删除失败",
      data: null,
    };
  }
}

module.exports = posts;
