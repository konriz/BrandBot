"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const app = express_1.default();
var users = {};
app.use(body_parser_1.urlencoded({
    extended: true
}));
app.use(body_parser_1.json());
app.set("view engine", "ejs");
app.get("/", function (_req, res) {
    res.render("index");
});
var listener = app.listen(3000, function () {
    console.log("Your app is listening: " + JSON.stringify(listener.address()));
});
//# sourceMappingURL=app.js.map