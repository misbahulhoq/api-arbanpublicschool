"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoEmailTransporter = exports.mainEmailTransporter = exports.contactEmailTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const contactEmailTransporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.contact_email,
        pass: process.env.contact_email_app_pass,
    },
});
exports.contactEmailTransporter = contactEmailTransporter;
const mainEmailTransporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.email_address,
        pass: process.env.email_pass,
    },
});
exports.mainEmailTransporter = mainEmailTransporter;
const infoEmailTransporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.info_email,
        pass: process.env.info_email_app_pass,
    },
});
exports.infoEmailTransporter = infoEmailTransporter;
