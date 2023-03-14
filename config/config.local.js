exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: "localhost",
    // 端口号
    port: "3306",
    // 用户名
    user: "mmll",
    // 密码
    password: "mmll528718",
    // 数据库名
    database: "yanlu",
    //字符集
    charset: "utf8mb4",
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};

exports.Url = "http://127.0.0.1:7001/public";
