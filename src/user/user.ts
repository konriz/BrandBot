import { BotNode } from "../nodesTree/nodes/abstract-node";

export class User {

  psid: string;
  firstName = "";
  lastName = "";
  locale = "";
  timezone = "";
  gender = "neutral";
  address = "";
  botOffUntil: Date = null;
  private _lastSeenNodeName: string;

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

  set lastSeenNodeName(nodeName: string) {
    this._lastSeenNodeName = nodeName;
  }

  get lastSeenNodeName(): string {
    return this._lastSeenNodeName;
  }
};
