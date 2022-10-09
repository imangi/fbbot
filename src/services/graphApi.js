const dotenv = require("dotenv");
const { URL, URLSearchParams } = require("url");
const axios = require("axios");
//const user = require("./user");

dotenv.config();

const API_URL = process.env.API_URL;
const APP_ID = process.env.APP_ID;
const PAGE_ID = process.env.PAGE_ID;
const VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const APP_SECRET = process.env.APP_SECRET;

class GraphApi {
  static async callSendApi(requestBody) {
    let url = new URL(`${API_URL}/${PAGE_ID}/messages`);
    url.search = new URLSearchParams({
      access_token: `${PAGE_ACCESS_TOKEN}`,
    });
    console.warn("Request body is\n" + JSON.stringify(requestBody));
    let response = await axios.post(url, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
      // access_token: `${PAGE_ACCESS_TOKEN}`,
    });
    if (!response.ok) {
      consoleconst`Unable to call Send API: ${response.statusText}`,
        await response.json();
    }
  }

  static async callSubscriptionsAPI() {
    // Send the HTTP request to the Subscriptions Edge to configure your webhook
    // You can use the Graph API's /{app-id}/subscriptions edge to configure and
    // manage your app's Webhooks product
    // https://developers.facebook.com/docs/graph-api/webhooks/subscriptions-edge

    let url = new URL(`${API_URL}/${PAGE_ID}/subscribed_apps`);
    url.search = new URLSearchParams({
      subscribed_feilds: `feed`,
      access_token: `${PAGE_ACCESS_TOKEN}`,
    });
    let response = await axios.post(url, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log(`Request sent.`);
    } else {
      console.error(
        `Unable to callSubscriptionsAPI: ${response.statusText}`,
        await response.json()
      );
    }
  }

  static async callMessengerProfileAPI(requestBody) {
    // Send the HTTP request to the Messenger Profile API

    console.log(`Setting Messenger Profile for app ${config.appId}`);
    let url = new URL(`${API_URL}/me/messenger_profile`);
    url.search = new URLSearchParams({
      access_token: PAGE_ACCESS_TOKEN,
    });
    let response = await axios.post(url, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    if (response.ok) {
      console.log(`Request sent.`);
    } else {
      console.warn(
        `Unable to callMessengerProfileAPI: ${response.statusText}`,
        await response.json()
      );
    }
  }

  static async getUserProfile(senderPsid) {
    let url = new URL(`${API_URL}/${senderPsid}`);
    url.search = new URLSearchParams({
      access_token: PAGE_ACCESS_TOKEN,
      fields: "first_name",
    });
    let response = await axios.get(url);
    if (response.ok) {
      let userProfile = await response.json();
      return {
        firstName: userProfile.first_name,
      };
    } else {
      console.warn(
        `Could not load profile for ${senderPsid}: ${response.statusText}`,
        await response.json()
      );
      return null;
    }
  }
}

module.exports = GraphApi;

/*const callSendApi = (requestBody) => {
  return new Promise(async (resolve, reject) = {
    try {
  let url = new URL(`https://graph.facebook.com/v13.0/me/messages`);
  url.search = new URLSearchParams({
    access_token: PAGE_ACCESS_TOKEN,
  });
  console.warn("Request body is\n" + JSON.stringify(requestBody));
  let response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  })
resolve(requestBody)
}else {
  reject("Unable to send message:" );
}

  if (!response.ok) {
    console.warn(
      `Unable to call Send API: ${response.statusText}`,
      await response.json()
    )
  }
}*/

/*const getUserProfile = (senderPsid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let url = new URL(`https://graph.facebook.com/v13.0/${senderPsid}`);
      url.search = new URLSearchParams({
        access_token: PAGE_ACCESS_TOKEN,
        fields: "first_name, last_name",
      });
      request(
        {
          uri: url,
          method: "GET",
        },
        (err, res, body) => {
          if (!err) {
            //convert string to json object
            body = JSON.parse(body);
            let firstName = userProfile.first_name;
            resolve(firstName);
          } else {
            reject("Unable to send message:" + err);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

/*const getUserProfile = async (senderPsid) => {
  let url = new URL(`https://graph.facebook.com/v13.0/${senderPsid}`);
  url.search = new URLSearchParams({
    access_token: PAGE_ACCESS_TOKEN,
    fields: "first_name, last_name",
  });
  let response = await fetch(url);
  if (response.ok) {
    let userProfile = await response.json();
    return {
      firstName: userProfile.first_name,
      lastName: userProfile.last_name,
    };
  } else {
    console.warn(
      `Could not load profile for ${senderPsid}: ${response.statusText}`,
      await response.json()
    );
    return null;
  }
};*/
