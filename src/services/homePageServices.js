const request = require("request");
const dotenv = require("dotenv");
const getUserName = require("./getUserName");
const getPostOne = require("./postone");
dotenv.config();

let PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

/*const postOne = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let COMMENT_ID = await getPostOne.getPostOne;
      let userName = await getUserName.getFacebookUserName;
      let request_body = {
        recipient: {
          comment_id: `${COMMENT_ID}`,
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
};*/
