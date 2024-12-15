"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
const auth_1 = __importDefault(require("../routes/auth"));
const students_1 = __importDefault(require("../routes/students"));
const numbers_1 = __importDefault(require("../routes/numbers"));
function routes(app) {
    app.use("/auth", auth_1.default);
    app.use("/students", students_1.default);
    app.use("/numbers", numbers_1.default);
}
