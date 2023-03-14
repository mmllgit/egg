"use strict";

const Controller = require("egg").Controller;

class todoList extends Controller {
  async getTodoList() {
    const { ctx } = this;
    const { time } = ctx.request.query;
    const user_number = await ctx.service.verifyToken.verifyToken();
    const result = await ctx.service.todoList.getTodoList({
      user_number,
      time,
    });
    ctx.body = {
      code: 200,
      msg: "获取成功",
      data: result,
    };
  }

  async addTodo() {
    const { ctx } = this;
    const todo_id = ctx.helper.uuid();
    const user_number = await ctx.service.verifyToken.verifyToken();
    const { time, title, detail } = ctx.request.body;
    const result = await ctx.service.todoList.addTodo({
      time,
      title,
      detail,
      todo_id,
      user_number,
    });
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

  async deleteTodo() {
    const { ctx } = this;
    const { todo_id } = ctx.request.query;
    const result = await ctx.service.todoList.deleteTodo(todo_id);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 200,
        msg: "删除成功",
        data: {
          todo_id,
        },
      };
    } else {
      ctx.body = {
        code: 200,
        msg: "删除失败",
        data: null,
      };
    }
  }

  async updateTodo() {
    const { ctx } = this;
    const { todo_id, title, detail, time } = ctx.request.body;
    const updateContent = JSON.parse(
      JSON.stringify({
        time,
        detail,
        title,
      })
    );
    const result = await ctx.service.todoList.updateTodo(
      todo_id,
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
}

module.exports = todoList;
