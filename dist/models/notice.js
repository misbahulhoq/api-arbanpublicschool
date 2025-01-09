"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notice = void 0;
exports.validateNotice = validateNotice;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
// Utility function to format the date as "dd/mm/yy"
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Last two digits of the year
    return `${day}/${month}/${year}`;
}
// Create the Mongoose schema for the Notice
const NoticeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    resourceUrl: {
        type: String,
    },
    publishDate: {
        type: Date,
        default: Date.now,
        get: (value) => formatDate(value), // Apply the formatting function
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});
// Enable getters when using `toObject()` or `toJSON()`
NoticeSchema.set("toJSON", { getters: true });
NoticeSchema.set("toObject", { getters: true });
function validateNotice(data) {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        resourceUrl: joi_1.default.string().optional().allow(""),
    });
    return schema.validate(data);
}
// Create and export the model
exports.Notice = (0, mongoose_1.model)("Notice", NoticeSchema);
