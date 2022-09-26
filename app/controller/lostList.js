"use strict";

const Controller = require("egg").Controller;

class lostList extends Controller {
  async getLostList() {
    const { ctx } = this;
    const result = await ctx.service.lostList.getLostList();
    ctx.body = {
      code: 200,
      msg: "获取成功",
      data: result,
    };
  }
  async getLostOne() {
    const { ctx } = this;
    const { lost_id } = ctx.request.body;
    const result = await ctx.service.lostList.getLostOne(lost_id);
    ctx.body = {
      code: 200,
      msg: "获取成功",
      data: result,
    };
  }
  async addLost() {
    const { ctx } = this;
    const lost_id = ctx.helper.uuid();
    const lost_date = ctx.helper.nowDate();
    const lost_status = false;
    const back_date = "";
    const content = {
      lost_id,
      lost_date,
      lost_status,
      back_date,
      ...ctx.request.body,
    };
    const result = await ctx.service.lostList.addLost(content);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 200,
        msg: "新增成功",
        data: null,
      };
    } else {
      ctx.body = {
        code: 200,
        msg: "新增失败",
        data: null,
      };
    }
  }
  async updateLost() {
    const { ctx } = this;
    const { lost_id, lost_status } = ctx.request.body;
    const updateContent = { lost_status };
    if (lost_status) {
      updateContent.back_date = ctx.helper.nowDate();
    }
    const result = await ctx.service.lostList.updateLost(
      lost_id,
      updateContent
    );
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 200,
        msg: "更改成功",
        data: null,
      };
    } else {
      ctx.body = {
        code: 200,
        msg: "更改失败",
        data: null,
      };
    }
  }
  async deleteLost() {
    const { ctx } = this;
    const { lost_id } = ctx.request.body;
    const result = await ctx.service.lostList.deleteLost(lost_id);
    if (result.affectedRows === 1) {
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

module.exports = lostList;
