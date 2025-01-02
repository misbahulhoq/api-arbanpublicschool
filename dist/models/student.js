"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
exports.validateStudent = validateStudent;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        default: new Date().getFullYear(),
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fathersName: {
        type: String,
        required: true,
    },
    mothersName: {
        type: String,
        required: true,
    },
});
const Student = (0, mongoose_1.model)("student", studentSchema);
exports.Student = Student;
function validateStudent(student) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).required(),
        uid: joi_1.default.string().min(6).max(6).required(),
        class: joi_1.default.string().min(1).max(2).required(),
        phone: joi_1.default.string().min(11).max(20).required(),
        email: joi_1.default.string().min(8).required(),
        fathersName: joi_1.default.string().min(3).required(),
        mothersName: joi_1.default.string().min(3).required(),
    });
    return schema.validate(student);
}
