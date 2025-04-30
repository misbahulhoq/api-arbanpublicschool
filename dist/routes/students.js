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
const student_1 = require("../models/student");
const studentsRouter = express_1.default.Router();
studentsRouter.post("/", auth_1.verifyUser, auth_1.verifyTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, student_1.validateStudent)(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });
    const studentExists = yield student_1.Student.findOne({ uid: req.body.uid });
    if (studentExists)
        return res.status(400).send({ message: "Student already exists" });
    const student = new student_1.Student(req.body);
    yield student.save();
    res.send(student);
}));
studentsRouter.get("/", auth_1.verifyUser, auth_1.verifyTeacher, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const validClasses = [
        "-1",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "all",
    ];
    if (!validClasses.includes((_a = req.query) === null || _a === void 0 ? void 0 : _a.class)) {
        return res
            .status(400)
            .send("The class is not valid.. Class must be between -1 and 10.");
    }
    const query = { class: (_b = req.query) === null || _b === void 0 ? void 0 : _b.class };
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.size) || 10;
    // const students = await Student.find(req.query.class !== "all" ? query : {});
    const students = yield student_1.Student.find(req.query.class !== "all" ? query : {})
        .skip((page - 1) * limit)
        .limit(limit);
    const allClasses = req.query.class == "all";
    const studentsCount = yield student_1.Student.countDocuments(allClasses ? undefined : { class: req.query.class });
    res.send({
        totalStudents: studentsCount,
        students,
        class: req.query.class,
    });
}));
studentsRouter.get("/:uid", auth_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_1.Student.findOne({ uid: req.params.uid });
    if (!student)
        return res.status(404).send("No student found with the given uid.");
    res.send(student);
}));
studentsRouter.put("/:uid", auth_1.verifyUser, auth_1.verifyTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const uid = req.params.uid;
    const studentFound = yield student_1.Student.findOne({ uid: req.params.uid });
    if (!studentFound)
        return res.status(404).send("No student found with the provided uid");
    const updated = yield student_1.Student.findOneAndUpdate({ uid: req.params.uid }, req.body, { returnDocument: "after" });
    res.send(updated);
}));
studentsRouter.delete("/:uid", auth_1.verifyUser, auth_1.verifyTeacher, auth_1.verifyAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentFound = yield student_1.Student.findOne({ uid: req.params.uid });
    if (!studentFound)
        return res.status(404).send("No student found with the provided uid");
    const response = yield student_1.Student.deleteOne({ uid: req.params.uid });
    res.send(response);
}));
exports.default = studentsRouter;
