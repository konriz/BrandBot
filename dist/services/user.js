"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(psid) {
        this.firstName = "";
        this.lastName = "";
        this.locale = "";
        this.timezone = "";
        this.gender = "neutral";
        this.psid = psid;
    }
    setProfile(profile) {
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.locale = profile.locale;
        this.timezone = profile.timezone;
        if (profile.gender) {
            this.gender = profile.gender;
        }
    }
}
exports.User = User;
;
//# sourceMappingURL=user.js.map