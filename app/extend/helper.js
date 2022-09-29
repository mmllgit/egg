const moment = require("moment");

exports.relativeTime = (time) => moment(new Date(time * 1000)).fromNow();
exports.nowDate = () => moment().format("YYYY-MM-DD");

const { v4: uuidv4 } = require("uuid");

exports.uuid = () => uuidv4();

const Crypto = require("crypto");
exports.crypto = (str) => Crypto.createHash("md5").update(str).digest("hex");

const iconv = require("iconv-lite");

exports.iconv2utf8 = (filename) => iconv.decode(filename, "gbk");
