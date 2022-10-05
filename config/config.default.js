exports.security = {
  csrf: {
    enable: false,
  },
};

exports.jwt = {
  secret: "12345",
};

exports.cors = {
  origin: "*",
  allowMethods: "GET, HEAD, PUT, POST, DELETE, PATCH",
};

exports.cluster = {
  listen: {
    port: 7001,
    hostname: "0.0.0.0", // 运行外网访问
  },
};

exports.multipart = {
  mode: "file",
  fileExtensions: [".md", ".csv"],
};
