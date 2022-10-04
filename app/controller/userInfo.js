"use strict";

const Controller = require("egg").Controller;

class userInfo extends Controller {
  //登录
  async login() {
    const { ctx, app } = this;
    const { user_number, user_password } = ctx.request.body;
    const result = await ctx.service.userInfo.findOne(user_number);
    if (!result) {
      ctx.body = {
        code: 400,
        msg: "该用户不存在",
        data: result,
      };
    } else {
      if (ctx.helper.crypto(user_password) === result.user_password) {
        const { user_name, user_number, user_sign, user_head } = result;
        ctx.body = {
          code: 200,
          msg: "登录成功",
          data: {
            user_name,
            user_number,
            user_sign,
            user_head,
            token: app.jwt.sign(
              { user_number, user_password },
              app.config.jwt.secret,
              {
                expiresIn: "2073600s",
              }
            ),
          },
        };
      } else {
        ctx.body = {
          code: 400,
          msg: "账号或密码错误",
          data: null,
        };
      }
    }
  }

  //注册
  async register() {
    const { ctx } = this;
    const { user_name, user_number, user_password } = ctx.request.body;
    const isExist = await ctx.service.userInfo.findOne(user_number);
    if (isExist) {
      ctx.body = {
        code: 400,
        msg: "该用户已存在",
        data: null,
      };
    } else {
      const result = await ctx.service.userInfo.addOne(
        user_name,
        user_number,
        ctx.helper.crypto(user_password)
      );
      if (result.affectedRows === 1) {
        ctx.body = {
          code: 200,
          msg: "注册成功",
          data: null,
        };
      } else {
        ctx.body = {
          code: 400,
          msg: "注册失败",
          data: null,
        };
      }
    }
  }

  //更改其它信息
  async updateInfo() {
    const { ctx } = this;
    const { user_name, user_sign } = ctx.request.body;
    const user_number = await ctx.service.verifyToken.verifyToken();
    const result = await ctx.service.userInfo.updateOne(
      user_number,
      user_name,
      user_sign
    );
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 200,
        msg: "更改成功",
        data: null,
      };
    } else {
      ctx.body = {
        code: 400,
        msg: "更改失败",
        data: null,
      };
    }
  }

  //移除人员
  async removeUser() {
    const { ctx } = this;
    const { user_number } = ctx.request.body;
    const isExist = await ctx.service.userInfo.findOne(user_number);
    if (!isExist) {
      return (ctx.body = {
        code: 400,
        msg: "该用户不存在",
        data: null,
      });
    }
    const result = await ctx.service.userInfo.removeOne(user_number);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 200,
        msg: "删除成功",
        data: null,
      };
    } else {
      ctx.body = {
        code: 400,
        msg: "删除失败",
        data: null,
      };
    }
  }

  //获取所有人员
  async getAllUser() {
    const { ctx } = this;
    const result = await ctx.service.userInfo.getAllUser();
    ctx.body = {
      code: 200,
      msg: "获取成功",
      data: result,
    };
  }
}

module.exports = userInfo;
