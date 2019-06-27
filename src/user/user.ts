export class User {

  psid: string;
  firstName = "";
  lastName = "";
  locale = "";
  timezone = "";
  gender = "neutral";
  private _address = "";
  botOffUntil: Date = null;
  private _lastSeenNodeName: string;
  private _lastSeen: Date;


  constructor(psid: string) {
    this.psid = psid;
    this._lastSeen = new Date();
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

  set address(address: string) {
    this._address = address;
  }

  get address(): string {
    return this._address;
  }

  setBotOffDate(date: Date) {
    this.botOffUntil = date;
  }

  setBotOn() {
    this.botOffUntil = null;
  }

  set lastSeenNodeName(nodeName: string) {
    this._lastSeenNodeName = nodeName;
  }

  get lastSeenNodeName(): string {
    return this._lastSeenNodeName;
  }

  set lastSeen(date: Date) {
    this._lastSeen = date;
  }

  get lastSeen(): Date {
    return this._lastSeen;
  }
};
