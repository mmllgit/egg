const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const Crypto = require("crypto");

exports.relativeTime = (time) => moment(new Date(time * 1000)).fromNow();
exports.nowDate = () => moment().format("YYYY-MM-DD");
exports.uuid = () => uuidv4();
exports.crypto = (str) => Crypto.createHash("md5").update(str).digest("hex");
