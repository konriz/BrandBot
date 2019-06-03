
import i18n from "i18n";
import path from "path";

i18n.configure({
  locales: ["pl_PL"],
  defaultLocale: "pl_PL",
  directory: path.join(__dirname, "locales"),
  objectNotation: true,
  api: {
    __: "translate",
    __n: "translateN"
  }
});

module.exports = i18n;
