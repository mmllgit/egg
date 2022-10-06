exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: "47.108.173.86",
    // 端口号
    port: "3306",
    // 用户名
    user: "root",
    // 密码
    password: "root_pwd",
    // 数据库名
    database: "lost",
    //字符集
    charset: "utf8mb4",
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};

exports.Url = "http://47.108.173.86:7001/public";
