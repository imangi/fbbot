const dotenv = require("dotenv");
//const { URL, URLSearchParams } = require("url");
const axios = require("axios");


dotenv.config();

const API_URL = process.env.API_URL;

const PAGE_ID = process.env.PAGE_ID;

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;



module.exports = class GraphApi {
  static async callSendApi(requestBody) {
   

    console.warn("Request body is\n" + JSON.stringify(requestBody));

    let response = await axios.post(`${API_URL}/${PAGE_ID}/messages`, {
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
      params: { access_token: `${PAGE_ACCESS_TOKEN}` },
    });
    if (!response.ok) {
      consoleconst`Unable to call Send API: ${response.statusText}`,
        await response.json();
    }
  }

  static async callSubscriptionsAPI() {
   
    let url = new URL(`${API_URL}/${PAGE_ID}/subscribed_apps`, {
      params: {
        subscribed_feilds: `feed`,
        access_token: `${PAGE_ACCESS_TOKEN}`,
      },
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
};

