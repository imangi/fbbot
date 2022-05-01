const request = require("request");
const dotenv = require("dotenv");
dotenv.config();

PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
PAGE_ID = process.env.PAGE_ID;
POST_ONE = process.env.POST_ONE;

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
    }
  });
};

const postOne = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let comment_id = await getPostOne.comment_id;
      let request_body = {
        recipient: {
          id: comment_id,
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
                {
                  title: "Welcome!",
                  image_url:
                    "https://raw.githubusercontent.com/fbsamples/original-coast-clothing/main/public/styles/male-work.jpg",
                  subtitle: "We have the right hat for everyone.",
                  default_action: {
                    type: "web_url",
                    url: "https://www.originalcoastclothing.com/",
                    webview_height_ratio: "tall",
                  },
                  buttons: [
                    {
                      type: "web_url",
                      url: "https://www.originalcoastclothing.com/",
                      title: "View Website",
                    },
                    {
                      type: "postback",
                      title: "Start Chatting",
                      payload: "DEVELOPER_DEFINED_PAYLOAD",
                    },
                  ],
                },
              ],
            },
          },
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
