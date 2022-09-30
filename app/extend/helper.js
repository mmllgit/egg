const moment = require("moment");

exports.relativeTime = (time) => moment(time).fromNow();
exports.detailTime = () => moment().format("YYYY-MM-DD HH:mm:ss");
exports.nowDate = () => moment().format("YYYY-MM-DD");

const { v4: uuidV4 } = require("uuid");

exports.uuid = () => uuidV4();

const Crypto = require("crypto");
exports.crypto = (str) => Crypto.createHash("md5").update(str).digest("hex");

const { app } = this;
exports.splitImage = (imageUrls) =>
  imageUrls.split(";").map((item) => `${app.config.Url}/postImages/${item}`);

exports.joinImage = (imageUrlList) => imageUrlList.join(";");
