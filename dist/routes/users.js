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
const auth_1 = require("../middlewares/auth");
const user_1 = require("../models/user");
const usersRouter = express_1.default.Router();
usersRouter.post("/", auth_1.verifyUser, auth_1.verifyTeacher, auth_1.verifyAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, user_1.validateUser)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const foundUser = yield user_1.User.findOne({ uid: req.body.uid });
    if (foundUser)
        return res.status(400).send("User Id already taken");
    const newUser = yield new user_1.User(req.body).save();
    const userObject = newUser.toJSON();
    delete userObject.password;
    res.send(userObject);
}));
usersRouter.get("/", auth_1.verifyUser, auth_1.verifyTeacher, auth_1.verifyAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_1.User.find().select("-password");
    res.send(allUsers);
}));
exports.default = usersRouter;
