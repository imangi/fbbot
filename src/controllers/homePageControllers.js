const dotenv = require("dotenv");
dotenv.config();
const request = require("request");

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const PAGE_ID = process.env.PAGE_ID;

const getHomePage = (req, res) => {
  return res.render("homePage.ejs");
};

const getWebhook = (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = MY_VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

const connectPage = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      let URL = `https://graph.facebook.com/${PAGE_ID}/subscribed_apps?subscribed_fields=feed&access_token=${PAGE_ACCESS_TOKEN}`;

      request(
        {
          uri: URL,
          method: POST,
        },
        (err, res) => {
          if (!err) {
            console.log(res);
            resolve();
          } else {
            reject(err);
            console.log(err);
          }
        }
      );
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
};

module.exports = {
  getHomePage: getHomePage,
  getWebhook: getWebhook,
  connectPage: connectPage,
};
