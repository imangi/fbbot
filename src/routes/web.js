const express = require("express");
const homePageControllers = require("../controllers/homePageControllers");
const homePageServices = require("../services/homePageServices");

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homePageControllers.getHomePage);
  router.get("/webhook", homePageControllers.getWebhook);
  router.post("/webhook", homePageServices.postOne);
  return app.use("/", router);
};

module.exports = initWebRoutes;
