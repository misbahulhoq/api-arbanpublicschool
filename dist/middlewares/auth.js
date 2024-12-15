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
exports.verifyAdmin = exports.verifyTeacher = exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = req.header("authToken");
    if (!authToken)
        return res.status(400).send("No token found.");
    try {
        const decoded = jsonwebtoken_1.default.verify(authToken, process.env.jwtPrivateKey);
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).send("Invalid or expired token..");
    }
});
exports.verifyUser = verifyUser;
const verifyTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const isTeacher = req.user.role === "teacher";
    if (!isTeacher)
        return res.status(403).send("Forbidden access.");
    next();
});
exports.verifyTeacher = verifyTeacher;
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const isAdmin = req.user.isAdmin;
    if (!isAdmin)
        return res.status(403).send("Forbidden access.");
    next();
});
exports.verifyAdmin = verifyAdmin;
