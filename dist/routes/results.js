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
const numberFormatter_1 = require("../lib/utils/numberFormatter");
const positionFormatter_1 = require("../utils/positionFormatter");
const exams_1 = __importDefault(require("../models/exams"));
const results = express_1.default.Router();
results.get("/", auth_1.verifyUser, auth_1.verifyTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const numbers = yield number_1.Num.find(query);
    const formattedNums = (0, numberFormatter_1.consolidateNumbers)(numbers);
    const exams = yield exams_1.default.find({ examYear: req.query.examYear });
    const examCodes = exams.map((item) => {
        return item.examCode;
    });
    const resultWithAverage = formattedNums.map((props) => {
        const updatedProps = {
            uid: props.uid,
            level: props.level,
        };
        const subjects = [
            ...new Set([
                ...props.firstTutorial.map((item) => item.name),
                ...props.firstSemester.map((item) => item.name),
                ...props.secondTutorial.map((item) => item.name),
                ...props.secondSemester.map((item) => item.name),
                ...props.thirdTutorial.map((item) => item.name),
                ...props.thirdSemester.map((item) => item.name),
            ]),
        ];
        // Prepare table data
        const tableData = subjects.map((subject) => {
            const firstTutorial = props.firstTutorial.find((item) => item.name === subject);
            const firstSemester = props.firstSemester.find((item) => item.name === subject);
            const secondTutorial = props.secondTutorial.find((item) => item.name === subject);
            const secondSemester = props.secondSemester.find((item) => item.name === subject);
            const thirdTutorial = props.thirdTutorial.find((item) => item.name === subject);
            const thirdSemester = props.thirdSemester.find((item) => item.name === subject);
            const marks1 = firstTutorial ? firstTutorial.obtMarks : 0;
            const marks2 = firstSemester ? firstSemester.obtMarks : 0;
            const marks3 = secondTutorial ? secondTutorial.obtMarks : 0;
            const marks4 = secondSemester ? secondSemester.obtMarks : 0;
            const marks5 = thirdTutorial ? thirdTutorial.obtMarks : 0;
            const marks6 = thirdSemester ? thirdSemester.obtMarks : 0;
            const fullMarks = firstSemester === null || firstSemester === void 0 ? void 0 : firstSemester.fullMarks;
            const totalMarks = marks1 + marks2 + marks3;
            let average = ((marks1 + marks2 + marks3 + marks4 + marks5 + marks6) /
                ((examCodes.includes("2401") ? 1 : 0) +
                    (examCodes.includes("2402") ? 1 : 0) +
                    (examCodes.includes("2403") ? 1 : 0) +
                    (examCodes.includes("2404") ? 1 : 0) +
                    (examCodes.includes("2405") ? 1 : 0) +
                    (examCodes.includes("2406") ? 1 : 0))).toFixed(2);
            average = parseFloat(average);
            const percentage = (average / fullMarks) * 100;
            let GPA;
            if (percentage >= 80 && percentage <= 100)
                GPA = 5;
            else if (percentage < 80 && percentage >= 70)
                GPA = 4;
            else if (percentage < 70 && percentage >= 60)
                GPA = 3.5;
            else if (percentage < 60 && percentage >= 50)
                GPA = 3;
            else if (percentage < 50 && percentage >= 40)
                GPA = 2;
            else if (percentage < 40 && percentage >= 33)
                GPA = 1;
            else
                GPA = 0;
            return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ subject }, (marks1 && { marks1 })), (marks2 && { marks2 })), (marks3 && { marks3 })), (marks4 && { marks4 })), (marks5 && { marks5 })), (marks6 && { marks6 })), { totalMarks,
                average,
                GPA,
                fullMarks });
        });
        //   calculate total marks
        const totalAverageMarks = tableData.reduce((sum, av) => sum + av.average, 0);
        const totalGPA = tableData.reduce((sum, av) => sum + av.GPA, 0);
        const averageGPA = tableData.every((d) => d.GPA > 0)
            ? tableData.reduce((sum, av) => sum + av.GPA, 0) / tableData.length
            : 0;
        updatedProps.tableData = tableData;
        updatedProps.totalAverageMarks = totalAverageMarks;
        updatedProps.totalGPA = totalGPA;
        updatedProps.averageGPA = averageGPA;
        return updatedProps;
    });
    const isPrimarySchool = ["-1", "0", "1", "2", "3", "4", "5"].includes(req.query.class);
    const isHighSchool = ["6", "7", "8", "9", "10"].includes(req.query.class);
    // sort the array according to totalAverageMarks if primary school
    if (isPrimarySchool) {
        resultWithAverage.sort((a, b) => b.totalAverageMarks - a.totalAverageMarks);
    }
    // sort the array according to averageGPA if high school
    if (isHighSchool) {
        resultWithAverage.sort((a, b) => {
            var _a, _b, _c, _d;
            const gpaA = (_a = a.averageGPA) !== null && _a !== void 0 ? _a : -Infinity;
            const gpaB = (_b = b.averageGPA) !== null && _b !== void 0 ? _b : -Infinity;
            const marksA = (_c = a.totalAverageMarks) !== null && _c !== void 0 ? _c : -Infinity;
            const marksB = (_d = b.totalAverageMarks) !== null && _d !== void 0 ? _d : -Infinity;
            if (gpaA === gpaB) {
                return marksB - marksA; // Sort by marks if GPA is same
            }
            return gpaB - gpaA; // Sort by GPA
        });
    }
    const resultWithPosition = resultWithAverage.map((item, index) => {
        const position = index + 1;
        return Object.assign(Object.assign({}, item), { position: (0, positionFormatter_1.positionFormatter)(position) });
    });
    res.send(resultWithPosition);
}));
exports.default = results;
