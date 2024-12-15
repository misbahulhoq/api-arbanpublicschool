"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.validateUser = validateUser;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
    // stands for user id
    uid: {
        type: String,
        minlength: 6,
        maxlength: 6,
    },
    email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50,
    },
    phone: {
        type: String,
        required: true,
        minlength: 11,
    },
    password: {
        type: String,
        minlength: 6,
    },
    role: {
        type: String,
        required: true,
        default: "student",
        minlength: 6,
        maxlength: 20,
    },
    isAdmin: {
        type: Boolean,
    },
});
userSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({
        _id: this._id,
        uid: this.uid,
        email: this.email,
        isAdmin: this.isAdmin,
        role: this.role,
    }, process.env.jwtPrivateKey, { expiresIn: "7d" });
    return token;
};
const User = mongoose_1.default.model("user", userSchema);
exports.User = User;
function validateUser(user) {
    const schema = joi_1.default.object({
        uid: joi_1.default.string().min(6).max(6).required(),
        email: joi_1.default.string().min(8).max(50).required(),
        phone: joi_1.default.string().min(11).max(15).required(),
        password: joi_1.default.string().min(6).required(),
        role: joi_1.default.string().min(6).max(20).required(),
        isAdmin: joi_1.default.boolean(),
    });
    return schema.validate(user);
}
