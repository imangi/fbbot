const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

let PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
let PAGE_ID = process.env.PAGE_ID;
let POST_ONE = process.env.POST_ONE;

const getPostOne = () => {
  return new Promise((resolve, reject) => {
    try {
      let URL = `https://graph.facebook.com/${PAGE_ID}/subscribed_apps?subscribed_fields=feed&access_token=${PAGE_ACCESS_TOKEN}`;

      request(
        {
          uri: URL,
          method: POST,
        },
        (err, res, body) => {
          if (!err) {
            body = JSON.parse(body);
            /*for (let i = 0; i < data.length; i++) {
              data[i].id;
            }
            let COMMENT_ID = data[i].id;

            console.log(COMMENT_ID);
            resolve(COMMENT_ID);*/
            console.log(body);
          } else {
            reject("unable to get data" + err);
          }
        }
      );
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
};

module.exports = getPostOne;