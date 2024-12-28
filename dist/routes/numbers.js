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
const number_1 = require("../models/number");
const student_1 = require("../models/student");
const numbersRouter = express_1.default.Router();
numbersRouter.post("/", auth_1.verifyUser, auth_1.verifyTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, number_1.validateNumber)(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });
    // if the client sends a uid which does not exist return 400
    const foundStudent = yield student_1.Student.findOne({ uid: req.body.uid });
    if (!foundStudent) {
        return res.status(400).send({ message: "Wrong UID." });
    }
    // if a student's number is already saved with a uid and exam code, return 400.
    const numberAlreadySaved = yield number_1.Num.findOne({
        uid: req.body.uid,
        examCode: req.body.examCode,
    });
    if (numberAlreadySaved) {
        return res
            .status(400)
            .send({ message: "Number already saved with this uid and examCode" });
    }
    const number = new number_1.Num(req.body);
    yield number.save();
    res.send(number);
}));
numbersRouter.get("/", auth_1.verifyUser, auth_1.verifyTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    if (query) {
        const numbers = yield number_1.Num.find(query);
        return res.send(numbers);
    }
    const numbers = yield number_1.Num.find();
    res.send(numbers);
}));
numbersRouter.get("/:uid", auth_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const number = yield number_1.Num.find({ uid: req.params.uid });
    console.log(number);
    res.send(number);
}));
// get a number by id,
numbersRouter.get("/id/:id", auth_1.verifyUser, auth_1.verifyTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundNum = yield number_1.Num.findById(req.params.id);
    if (!foundNum)
        return res
            .status(404)
            .send({ message: "No data found with the provided id" });
    res.send(foundNum);
}));
numbersRouter.put("/:uid", auth_1.verifyUser, auth_1.verifyTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isFound = yield number_1.Num.findOne({ uid: req.params.uid });
    if (!isFound)
        return res
            .status(404)
            .send({ message: "No data found with the provided uid." });
    const foundNumber = yield number_1.Num.findOneAndUpdate({ uid: req.params.uid }, req.body);
    res.send(foundNumber);
}));
numbersRouter.put("/id/:id", auth_1.verifyUser, auth_1.verifyTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isFound = yield number_1.Num.findOne({ uid: req.params.uid });
    if (!isFound)
        return res
            .status(404)
            .send({ message: "No data found with the provided uid." });
    const foundNumber = yield number_1.Num.findOneAndUpdate({ uid: req.params.uid }, req.body);
    res.send(foundNumber);
}));
exports.default = numbersRouter;
