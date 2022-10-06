const GraphApi = require("./graphApi.js");
const dotenv = require("dotenv");
const user = require("./user");

const Response = require("./response.js");

dotenv.config();

class Receive {
  constructor(user, webhookEvent, isUserRef) {
    this.user = user;
    this.webhookEvent = webhookEvent;
    this.isUserRef = isUserRef;
  }

  handlePrivateReply(type, object_id) {
    Response.genMessage(user);

    let requestBody = {
      recipient: {
        [type]: object_id,
      },
      message: Response,
    };
    GraphApi.callSendApi(requestBody);
  }
}

module.exports = Receive;

/*const handlePrivateReply = async (type, object_id) => {
  // let url = `https://graph.facebook.com/v13.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  let firstName = await GraphApi.getUserProfile(sender_psid);
  let requestBody = {
    recipient: {
      [type]: object_id,
    },
    message: {
      text: `Hi ${firstName} !, welcome to Daisy Bloom 💛
This is an automated reply to your comment made on our page.
One of our team members will get back to you shortly

Hi, Daisy Bloom වෙත සාදරයෙන් පිළිගනිමු

අපගේ කණ්ඩායමේ සාමාජිකයෙකු ඔබ හා සම්බන්ධ වනු ඇත`,
    },
  };
  GraphApi.callSendApi(requestBody);
};

module.exports = {
  handlePrivateReply: handlePrivateReply,
};*/
