"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTeacher = validateTeacher;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const teacherSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
});
const Teacher = (0, mongoose_1.model)("teacher", teacherSchema);
function validateTeacher(teacher) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().min(5),
        phone: joi_1.default.string().required().min(11),
        email: joi_1.default.string().required(),
        about: joi_1.default.string().optional().allow(""),
        photoUrl: joi_1.default.string().required(),
    });
    return schema.validate(teacher);
}
exports.default = Teacher;
