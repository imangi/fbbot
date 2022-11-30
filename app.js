const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

dotenv.config();

let app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//initWebRoutes

//const User = require("./src/services/user.js");
const Receive = require("./src/services/receive.js");
const GraphApi = require("./src/services/graphApi.js");

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;

let users = {};

app.get("/webhook", (req, res) => {
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
});

app.post("/webhook", (req, res) => {
  let body = req.body;

  /*console.log(`\u{1F7EA} Received webhook:`);
  console.dir(body, { depth: null });*/

  // Check if this is an event from a page subscription
  if (body.object === "page") {
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");

    // Iterate over each entry - there may be multiple if batched
    body.entry &&
      body.entry.forEach(async function (entry) {
        if ("changes" in entry) {
          console.log(body);
          // Handle Page Changes event
          let receiveMessage = new Receive();
          if (entry.changes[0].field === "feed") {
            let change = entry.changes[0].value;
            let userName = change.from.name;
            switch (change.item) {
              case "post":
                return receiveMessage.handlePrivateReply(
                  "post_id",
                  change.post_id,
                  userName
                );
              case "comment":
                return receiveMessage.handlePrivateReply(
                  "comment_id",
                  change.comment_id,
                  userName
                );
              default:
                console.warn("Unsupported feed change type.");
                return;
            }
          }
        }
      });
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

let PORT = process.env.PORT || 5544;
let HOST = "104.152.222.93";

app.listen(PORT, () => {
  console.log(`messenger bot is running on "http://${HOST}:${PORT}/"`);
});
