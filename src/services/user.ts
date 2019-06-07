export class User {

  psid: string;
  firstName = "";
  lastName = "";
  locale = "";
  timezone = "";
  gender = "neutral";
  address = "";
  botOffUntil: Date = null;

  constructor(psid: string) {
    this.psid = psid;
  }
  
  setProfile(profile: any) {
    this.firstName = profile.first_name;
    this.lastName = profile.last_name;
    this.locale = profile.locale;
    this.timezone = profile.timezone;
    if (profile.gender) {
      this.gender = profile.gender;
    }
  }

  setAddress(address: any) {
    this.address = address;
  }

  setBotOffDate(date: Date) {
    this.botOffUntil = date;
  }

  setBotOn() {
    this.botOffUntil = null;
  }
};
