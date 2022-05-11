const request = require("request");

let getFacebookUserName = (sender_psid) => {
  return new Promise((resolve, reject) => {
    try {
      let URL = `https://graph.facebook.com/v13.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`;

      request(
        {
          uri: URL,
          method: "GET",
        },
        (err, res, body) => {
          if (!err) {
            //convert string to json object
            body = JSON.parse(body);
            let username = `${body.first_name}`;
            console.log(username);
            console.log(body);
            resolve(username);
          } else {
            reject("Unable to send message:" + err);
          }
        }
      );
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
};

module.exports = getFacebookUserName;
