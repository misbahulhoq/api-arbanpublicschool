"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumber = exports.Num = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const numberSchema = new mongoose_1.Schema({
    uid: {
        type: String,
        required: true,
    },
    exam: {
        type: String,
        required: true,
    },
    examCode: {
        type: String,
        required: true,
    },
    numbers: [
        {
            sub: { type: String, required: true },
            fullMarks: { type: Number, required: true },
            obtMarks: { type: Number, required: true },
        },
    ],
});
const Num = (0, mongoose_1.model)("number", numberSchema);
exports.Num = Num;
const validateNumber = (number) => {
    const schema = joi_1.default.object({
        uid: joi_1.default.string().required().min(6).max(6),
        exam: joi_1.default.string().required(),
        examCode: joi_1.default.string().required().min(4).max(4),
        numbers: joi_1.default.array().required(),
    });
    return schema.validate(number);
};
exports.validateNumber = validateNumber;
