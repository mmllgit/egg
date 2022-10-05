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
    const input = fs.readFileSync(inputFilePath);
    const indexArray = [0, 2, 4];
    const recommendList = iconv
      .decode(input, "gbk")
      .split("\r")
      .map((item) => {
        return item.split(",");
      })
      .filter((item, index) => {
        return indexArray.includes(index);
      });
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
}

module.exports = recommend;
