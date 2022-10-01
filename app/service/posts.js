"use strict";

const Service = require("egg").Service;

class posts extends Service {
  async getPostList() {
    const { ctx, app } = this;
    const result = (await app.mysql.select("posts")) || [];
    const len = result.length;
    for (let i = 0; i < len; i++) {
      const { user_number } = result[i];
      const { user_head, user_name } = await ctx.service.userInfo.findOne(
        user_number
      );
      result[i]["user_name"] = user_name;
      result[i]["user_head"] = user_head;
      result[i]["post_image"] = result[i]["post_image"]
        .split(";")
        .filter((item) => item.length > 0);
      result[i]["post_likes_list"] = result[i]["post_likes_list"]
        .split(";")
        .filter((item) => item.length > 0);
      result[i]["is_like"] = result[i]["post_likes_list"].includes(user_name);
      result[i]["post_last_time"] = ctx.helper.relativeTime(
        result[i]["post_release_time"]
      );
    }
    return result;
  }

  async getOnePost(post_id) {
    const { app } = this;
    const result = await app.mysql.get("posts", { post_id });
    return result;
  }

  async addPost(post_content, post_image) {
    const { ctx, app } = this;
    const post_id = ctx.helper.uuid();
    const user_number = await ctx.service.verifyToken.verifyToken();
    const post_release_time = ctx.helper.detailTime();
    const result = await app.mysql.insert("posts", {
      post_id,
      post_content,
      post_image,
      post_release_time,
      user_number,
    });
    return result;
  }

  async likeStar(post_id) {
    const { ctx, app } = this;
    const user_number = await ctx.service.verifyToken.verifyToken();
    const post = await ctx.service.posts.getOnePost(post_id);
    const postLikeList = post.post_likes_list
      .split(";")
      .filter((item) => item > 0);
    const options = {
      where: {
        post_id,
      },
    };
    const postIndex = postLikeList.findIndex((item) => item === user_number);
    if (postIndex !== -1) {
      postLikeList.splice(postIndex, 1);
    } else {
      postLikeList.push(user_number);
    }
    const postInfo = {
      post_id,
      post_likes_list: postLikeList.join(";"),
      post_likes: postLikeList.length,
    };
    const result = await app.mysql.update("posts", postInfo, options);
    return result;
  }

  async removePost(post_id) {
    const { app, ctx } = this;
    const user_number = await ctx.service.verifyToken.verifyToken();
    const post = await ctx.service.posts.getOnePost(post_id);
    let result = null;
    if (user_number === post.user_number) {
      result = await app.mysql.delete("posts", { post_id });
    }
    return result;
  }
}

module.exports = posts;
