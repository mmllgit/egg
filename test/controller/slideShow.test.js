const { app, mock, assert } = require("egg-mock/bootstrap");

describe("test/controller/slideShow.js", () => {
  it("should POST /", async () => {
    const result = await app
      .httpRequest()
      .post("/uploadSlideImage")
      .attach("files", __dirname + "/测试.png");

    assert(result.body.name === "测试.png");
  });
});
