"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
const auth_1 = __importDefault(require("../routes/auth"));
const students_1 = __importDefault(require("../routes/students"));
const numbers_1 = __importDefault(require("../routes/numbers"));
const contact_1 = __importDefault(require("../routes/contact"));
const admission_1 = __importDefault(require("../routes/admission"));
const issue_1 = __importDefault(require("../routes/issue"));
const users_1 = __importDefault(require("../routes/users"));
const notices_1 = __importDefault(require("../routes/notices"));
const events_1 = __importDefault(require("../routes/events"));
const teacher_1 = __importDefault(require("../routes/teacher"));
const apollochat_1 = __importDefault(require("../routes/apollochat"));
const results_1 = __importDefault(require("../routes/results"));
function routes(app) {
    app.use("/auth", auth_1.default);
    app.use("/students", students_1.default);
    app.use("/teachers", teacher_1.default);
    app.use("/numbers", numbers_1.default);
    app.use("/contact", contact_1.default);
    app.use("/admissions", admission_1.default);
    app.use("/issues", issue_1.default);
    app.use("/users", users_1.default);
    app.use("/notices", notices_1.default);
    app.use("/events", events_1.default);
    app.use("/apollochat", apollochat_1.default);
    app.use("/results", results_1.default);
}
