const express = require("express");
const homePageControllers = require("../controllers/homePageControllers");

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homePageControllers.getHomePage);
  router.get("/webhook", homePageControllers.getWebhook);
  router.post("/webhook", homePageControllers.postWebhook);
  return app.use("/", router);
};

module.exports = initWebRoutes;
