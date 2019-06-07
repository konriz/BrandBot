"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(psid) {
        this.firstName = "";
        this.lastName = "";
        this.locale = "";
        this.timezone = "";
        this.gender = "neutral";
        this.address = "";
        this.botOffUntil = null;
        this.psid = psid;
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
    setAddress(address) {
        this.address = address;
    }
    setBotOffDate(date) {
        this.botOffUntil = date;
    }
    setBotOn() {
        this.botOffUntil = null;
    }
}
exports.User = User;
;
//# sourceMappingURL=user.js.map