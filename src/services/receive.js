const GraphApi = require("./graphApi.js");
const dotenv = require("dotenv");


dotenv.config();

module.exports = class Receive {
 
  handlePrivateReply(type, object_id, userName) {
    let requestBody = {
      recipient: {
        [type]: object_id,
      },
      message: {
        text: ` Hi ${userName}!, welcome to Daisy Bloom 💛. This is an automated reply to your comment made on our page. 
          One of our team members will get back to you shortly.
           Hi ${userName}}, Daisy Bloom වෙත සාදරයෙන් පිළිගනිමු 💛. 
           අපගේ කණ්ඩායමේ සාමාජිකයෙකු ඔබ හා සම්බන්ධ වනු ඇත`,
      },
    };

    GraphApi.callSendApi(requestBody);
  }
};

