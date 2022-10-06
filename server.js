const express = require("express");
const viewEngine = require("./src/config/viewEngine.js");

const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config view engine

viewEngine(app);

//initWebRoutes

const User = require("./src/services/user.js");
const Receive = require("./src/services/receive.js");
const GraphApi = require("./src/services/graphApi.js");

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;

let users = {};

app.get("/", (req, res) => {
  return res.render("homePage.ejs");
});
app.get("/privacy-policy", (req, res) => {
  return res.render("privacy-policy.ejs");
});

app.get("/webhook", (req, res) => {
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
    body.entry.forEach(async function (entry) {
      if ("changes" in entry) {
        // Handle Page Changes event
        let receiveMessage = new Receive();
        if (entry.changes[0].field === "feed") {
          let change = entry.changes[0].value;
          switch (change.item) {
            case "post":
              return receiveMessage.handlePrivateReply(
                "post_id",
                change.post_id
              );
            case "comment":
              return receiveMessage.handlePrivateReply(
                "comment_id",
                change.comment_id
              );
            default:
              console.warn("Unsupported feed change type.");
              return;
          }
        }
      }

      entry.messaging.forEach(async function (webhookEvent) {
        // Discard uninteresting events
        if ("read" in webhookEvent) {
          console.log("Got a read event");
          return;
        } else if ("delivery" in webhookEvent) {
          console.log("Got a delivery event");
          return;
        } else if (webhookEvent.message && webhookEvent.message.is_echo) {
          console.log(
            "Got an echo of our send, mid = " + webhookEvent.message.mid
          );
          return;
        }

        // Get the sender PSID
        let senderPsid = webhook_event.sender.id;

        if (senderPsid != null && senderPsid != undefined) {
          if (!(senderPsid in users)) {
            if (!guestUser) {
              // Make call to UserProfile API only if user is not guest
              let user = new User(senderPsid);
              GraphApi.getUserProfile(senderPsid)
                .then((userProfile) => {
                  user.setProfile(userProfile);
                })
                .catch((error) => {
                  // The profile is unavailable
                  console.log(JSON.stringify(body));
                  console.log("Profile is unavailable:", error);
                });
            } else {
              setDefaultUser(senderPsid);
              return receiveAndReturn(users[senderPsid], webhookEvent, false);
            }
          }

          // Check if the event is a message or postback and
          // pass the event to the appropriate handler function
        } else if (user_ref != null && user_ref != undefined) {
          // Handle user_ref
          setDefaultUser(user_ref);
          return receiveAndReturn(users[user_ref], webhookEvent, true);
        }
      });
    });
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`messenger bot is running at port ${PORT}`);
});
