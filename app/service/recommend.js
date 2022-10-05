"use strict";

const Service = require("egg").Service;

class recommend extends Service {
  async readCSVFile(recommendList) {
    const { app, ctx } = this;
    const len = recommendList[0].length;
    let resultFlag = true;
    for (let i = 0; i < len; i++) {
      const result = await app.mysql.insert("recommend", {
        recommend_id: ctx.helper.uuid(),
        recommend_title: recommendList[0][i],
        recommend_url: recommendList[1][i],
        recommend_content: recommendList[2][i],
      });
      if (result.affectedRows !== 1) {
        resultFlag = false;
      }
    }
    return resultFlag;
  }

  async getRecommendList() {
    const { app } = this;
    const result = await app.mysql.select("recommend");
    return result
  }
}

module.exports = recommend;
