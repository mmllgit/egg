"use strict";

const Service = require("egg").Service;

class TodoList extends Service {
  async getTodoList(todoMsg) {
    const result =
      (await this.app.mysql.select("todo_list", {
        where: todoMsg,
      })) || [];
    return result;
  }

  async addTodo(todoMsg) {
    const result = await this.app.mysql.insert("todo_list", todoMsg);
    return result;
  }

  async deleteTodo(todo_id) {
    const result = await this.app.mysql.delete("todo_list", { todo_id });
    return result;
  }

  async updateTodo(todo_id, updateMsg) {
    const options = {
      where: {
        todo_id,
      },
    };
    const todo_content = await this.app.mysql.get("todo_list", { todo_id });
    const result = await this.app.mysql.update(
      "todo_list",
      { ...todo_content, ...updateMsg },
      options
    );
    return result;
  }
}

module.exports = TodoList;
