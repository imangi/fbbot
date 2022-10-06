class Response {
  static genText(text) {
    let response = {
      text: text,
    };

    return response;
  }

  static genMessage(user) {
    let welcome = this.genText(
      `Hi ${user.firstName}!, welcome to Daisy Bloom 💛
        This is an automated reply to your comment made on our page.
        One of our team members will get back to you shortly
        
        Hi, Daisy Bloom වෙත සාදරයෙන් පිළිගනිමු
        
        අපගේ කණ්ඩායමේ සාමාජිකයෙකු ඔබ හා සම්බන්ධ වනු ඇත`
    );

    return welcome;
  }
}

module.exports = Response;
