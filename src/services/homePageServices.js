const request = require("request");
const dotenv = require("dotenv");
const getUserName = require("./getUserName");
dotenv.config();

let PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
let PAGE_ID = process.env.PAGE_ID;
let POST_ONE = process.env.POST_ONE;

const getPostOne = () => {
  return new Promise((resolve, reject) => {
    try {
      let URL = `https://graph.facebook.com/v13.0/${PAGE_ID}_${POST_ONE}/comments`;

      request(
        {
          uri: URL,
          method: GET,
        },
        (err, res, body) => {
          if (!err) {
            body = JSON.parse(body);
            for (let i = 0; i < data.length; i++) {
              data[i].id;
            }
            let comment_id = data[i].id;

            console.log(comment_id);
            resolve(comment_id);
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

const postOne = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let comment_id = await getPostOne.comment_id;
      let userName = await getUserName.getFacebookUserName;
      let request_body = {
        recipient: {
          id: comment_id,
        },
        message: {
          text: `Hi ${userName} test test test`,
        },
      };

      let URL = `https://graph.facebook.com/v13.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;

      request({
        uri: URL,
        method: POST,
        json: request_body,
      }),
        (err, res, body) => {
          if (!err) {
            console.log("message sent!");
          } else {
            console.error("Unable to send message:" + err);
          }
        };
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postOne: postOne,
};
