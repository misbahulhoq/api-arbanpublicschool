"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const examSchema = new mongoose_1.default.Schema({
    examYear: {
        type: String,
        required: true,
        default: new Date().getFullYear(),
    },
    examCode: {
        type: String,
        required: true,
    },
});
const Exam = mongoose_1.default.model("exam", examSchema);
exports.default = Exam;
