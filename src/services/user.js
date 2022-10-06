class User {
  constructor(psid) {
    this.psid = psid;
    this.firstName = "";
  }
  setProfile(profile) {
    this.firstName = profile.firstName || "";
  }
}

module.exports = User;
