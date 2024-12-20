"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIssue = validateIssue;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const issueSchema = new mongoose_1.Schema({
    submittedBy: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        default: "Found an issue at Arban Public School's Site.",
    },
    issue: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
});
const Issue = (0, mongoose_1.model)("issue", issueSchema);
function validateIssue(data) {
    const schema = joi_1.default.object({
        submittedBy: joi_1.default.string().required(),
        subject: joi_1.default.string().optional().allow(""),
        issue: joi_1.default.string().required(),
        priority: joi_1.default.string().required(),
        status: joi_1.default.string().required(),
    });
    return schema.validate(data);
}
exports.default = Issue;
