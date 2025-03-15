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
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../middlewares/auth");
const student_1 = require("../models/student");
const authRouter = express_1.default.Router();
function hashPass(pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        try {
            const hashed = yield bcryptjs_1.default.hash(pass, saltRounds);
            return hashed;
        }
        catch (ex) {
            throw new Error("Error in hashing password " + ex.message);
        }
    });
}
// when signing up, a user should pass valid email, uid and phone. Otherwise 400 wil be thrown.
authRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, user_1.validateUser)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    if (req.body.hasOwnProperty("isAdmin") || req.body["role"] !== "student") {
        return res
            .status(400)
            .send("Only student signup is allowed from the frontend.");
    }
    const validStudent = yield student_1.Student.findOne({
        uid: req.body.uid,
        email: req.body.email,
        phone: req.body.phone,
    });
    if (!validStudent)
        return res.status(400).send("You provided something wrong.");
    let userExists = yield user_1.User.findOne({ uid: req.body.uid });
    if (userExists)
        return res
            .status(400)
            .send({ code: "uid-exists", message: "User id already exists." });
    let user = new user_1.User(req.body);
    user.password = yield hashPass(req.body.password);
    user = yield user.save();
    res.send({ _id: user._id, uid: user.uid, email: user.email });
}));
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({ email: req.body.email, uid: req.body.uid });
    if (!user)
        return res.status(401).send("Invalid email or password.");
    const validPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(401).send("Invalid email or password.");
    const token = user.generateAuthToken();
    res.header("authToken", token).send({
        email: user.email,
        uid: user.uid,
        loginSuccess: true,
    });
}));
authRouter.get("/me", auth_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = yield user_1.User.findById(req.user._id, ["-password"]);
    res.send(user);
}));
exports.default = authRouter;
