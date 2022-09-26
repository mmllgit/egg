"use strict";

const Service = require("egg").Service;

class LostList extends Service {
  async getLostList() {
    const result = (await this.app.mysql.select("lost")) || [];
    return result;
  }
  async getLostOne(lost_id) {
    const result = await this.app.mysql.get("lost", { lost_id });
    return result;
  }
  async addLost(lostContent) {
    const result = await this.app.mysql.insert("lost", lostContent);
    return result;
  }
  async updateLost(lost_id, updateContent) {
    const options = {
      where: {
        lost_id,
      },
    };
    const lost_content = await this.app.mysql.get("lost", { lost_id });
    const result = await this.app.mysql.update(
      "lost",
      { ...lost_content, ...updateContent },
      options
    );
    return result;
  }
  async deleteLost(lost_id) {
    const result = await this.app.mysql.delete("lost", { lost_id });
    return result;
  }
}

module.exports = LostList;
