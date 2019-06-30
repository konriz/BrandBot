"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(psid) {
        this.firstName = "";
        this.lastName = "";
        this.locale = "";
        this.timezone = "";
        this.gender = "neutral";
        this._address = "";
        this.botOffUntil = null;
        this.psid = psid;
        this._lastSeen = new Date();
    }
    setProfile(profile) {
        this.firstName = profile.first_name;
        this.lastName = profile.last_name;
        this.locale = profile.locale;
        this.timezone = profile.timezone;
        if (profile.gender) {
            this.gender = profile.gender;
        }
    }
    set address(address) {
        this._address = address;
    }
    get address() {
        return this._address;
    }
    setBotOffDate(date) {
        this.botOffUntil = date;
    }
    setBotOn() {
        this.botOffUntil = null;
    }
    set lastSeenNodeName(nodeName) {
        this._lastSeenNodeName = nodeName;
    }
    get lastSeenNodeName() {
        return this._lastSeenNodeName;
    }
    set lastSeen(date) {
        this._lastSeen = date;
    }
    get lastSeen() {
        return this._lastSeen;
    }
}
exports.User = User;
;
//# sourceMappingURL=user.js.map