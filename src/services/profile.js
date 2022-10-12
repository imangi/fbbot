/*const GraphApi = require("./graph-api");
const message = require("../message/message.json");

module.exports = class Profile {
  setPageFeedWebhook() {
    GraphApi.callSubscriptionsAPI("feed");
  }

  getGreeting() {
    let greetings = [];
    greetings.push(this.getGreetingText(message));
    return {
      greeting: greetings,
    };
  }

  getGreetingText() {
    let Greeting = {
      text:
        (message.welcome,
        {
          userName: "{{userFirstName}}",
        }),
    };

    console.log({ Greeting });
    return Greeting;
  }
};*/
