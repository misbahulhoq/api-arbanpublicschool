"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    prompt: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Chat = mongoose_1.default.model("Chat", chatSchema);
exports.default = Chat;
