module.exports = (app) => {
  const { router, controller, jwt } = app;
  router.post("/login", controller.userInfo.login);
  router.post("/register", controller.userInfo.register);
  router.post("/updateInfo", jwt, controller.userInfo.updateInfo);
  router.post("/removeUser", jwt, controller.userInfo.removeUser);
  router.post("/getLostList", jwt, controller.lostList.getLostList);
  router.post("/getLostOne", jwt, controller.lostList.getLostOne);
  router.post("/addLost", jwt, controller.lostList.addLost);
  router.post("/updateLost", jwt, controller.lostList.updateLost);
  router.post("/deleteLost", jwt, controller.lostList.deleteLost);
  router.post("/updateHead", jwt, controller.upload.updateHead);
};
