export class User {

  psid: string;
  firstName = "";
  lastName = "";
  locale = "";
  timezone = "";
  gender = "neutral";

  constructor(psid: string) {
    this.psid = psid;
  }
  setProfile(profile: any) {
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.locale = profile.locale;
    this.timezone = profile.timezone;
    if (profile.gender) {
      this.gender = profile.gender;
    }
  }
};
