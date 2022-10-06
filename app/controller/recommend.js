"use strict";

const Controller = require("egg").Controller;
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
const pump = require("mz-modules/pump");

class recommend extends Controller {
  async readCSVFile() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const fileName = iconv.decode(file.filename, "gbk");
    const targetPath = path.join("app/public/recommendCSV", fileName);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);
    await pump(source, target);
    const inputFilePath = `app/public/recommendCSV/${fileName}`;
    const input = fs.readFileSync(inputFilePath, "utf-8");
    const recommendList = input
      .split("\r\r\n")
      .map((item) => {
        return item.split(",");
      })
      .slice(0, 3);
    console.log(recommendList[1])
    const result = await ctx.service.recommend.readCSVFile(recommendList);
    fs.rm(inputFilePath, (err) => {});
    if (result) {
      ctx.body = {
        code: 200,
        msg: "上传成功",
        data: null,
      };
    }
  }

  async getRecommendList() {
    const { ctx } = this;
    const result = await ctx.service.recommend.getRecommendList();
    ctx.body = {
      code: 200,
      msg: "获取成功",
      data: result,
    };
  }

  async deleteAllRecommend() {
    const { ctx } = this;
    const result = await ctx.service.recommend.deleteAllRecommend();
    if (result) {
      ctx.body = {
        code: 200,
        msg: "删除成功",
        data: null,
      };
    } else {
      ctx.body = {
        code: 200,
        msg: "删除失败",
        data: null,
      };
    }
  }
}

module.exports = recommend;
