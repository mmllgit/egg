module.exports = (app) => {
  const { router, controller, jwt } = app;
  router.post("/login", controller.userInfo.login);
  router.post("/register", controller.userInfo.register);
  router.post("/updateInfo", jwt, controller.userInfo.updateInfo);
  router.post("/removeUser", jwt, controller.userInfo.removeUser);
  router.post("/getLostList", jwt, controller.lostList.getLostList);
  router.post("/getAllUser", jwt, controller.userInfo.getAllUser);
  router.post("/getLostOne", jwt, controller.lostList.getLostOne);
  router.post("/addLost", jwt, controller.lostList.addLost);
  router.post("/updateLost", jwt, controller.lostList.updateLost);
  router.post("/deleteLost", jwt, controller.lostList.deleteLost);
  router.post("/updateHead", jwt, controller.upload.updateHead);
  router.post(
    "/getSlideShowImage",
    jwt,
    controller.slideShow.getSlideShowImage
  );
  router.post("/deleteImage", jwt, controller.slideShow.deleteImage);
  router.post("/uploadSlideImage", jwt, controller.slideShow.uploadSlideImage);
  router.post("/releasePost", jwt, controller.posts.releasePost);
  router.post("/getPostList", jwt, controller.posts.postList);
  router.post("/likeStar", jwt, controller.posts.likeStar);
  router.post("/removePost", jwt, controller.posts.removePost);
  router.post("/getSelfPosts", jwt, controller.posts.getSelfPosts);
  router.post("/readCSVFile", jwt, controller.recommend.readCSVFile);
  router.post("/getRecommendList", jwt, controller.recommend.getRecommendList);
};
