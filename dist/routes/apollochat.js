"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generative_ai_1 = require("@google/generative-ai");
const chat_1 = __importDefault(require("../models/chat"));
const data_1 = require("../data/data");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const apollochat = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const appollochatRouter = express_1.default.Router();
appollochatRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    const fullPrompt = `${data_1.data}\n\nUser: ${prompt}`;
    try {
        const result = yield apollochat.generateContent(prompt);
        const response = result.response.text();
        const chat = yield new chat_1.default({ fullPrompt, response }).save();
        res.send(chat);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}));
exports.default = appollochatRouter;
