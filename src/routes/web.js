const express = require("express");
const homePageControllers = require("../controllers/homePageControllers");
//const homePageServices = require("../services/homePageServices");
//const postone = require("../services/postone");

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homePageControllers.getHomePage);
  router.get("/webhook", homePageControllers.getWebhook);
  /*router.post("/webhook", homePageServices.postOne);*/
  // router.post("/webhook", postone.getpostone);
  /*app(
    `https://graph.facebook.com/${PAGE_ID}_${POST_ONE}/subscribed_apps?subscribed_fields=feed&access_token=${PAGE_ACCESS_TOKEN}`
  ).post((req, res) => {
    let body = req.body;
    console.log(body);
  });*/
  return app.use("/", router);
};

module.exports = initWebRoutes;
