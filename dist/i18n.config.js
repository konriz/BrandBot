"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = __importDefault(require("i18n"));
const path_1 = __importDefault(require("path"));
i18n_1.default.configure({
    locales: ["pl_PL"],
    defaultLocale: "pl_PL",
    directory: path_1.default.join(__dirname, "locales"),
    objectNotation: true,
    api: {
        __: "translate",
        __n: "translateN"
    }
});
module.exports = i18n_1.default;
//# sourceMappingURL=i18n.config.js.map