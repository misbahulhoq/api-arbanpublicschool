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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consolidateNumbers = consolidateNumbers;
const student_1 = require("../../models/student");
function consolidateNumbers(results) {
    const consolidated = {};
    results === null || results === void 0 ? void 0 : results.forEach((result) => {
        const { uid, examCode, subjects } = result, rest = __rest(result, ["uid", "examCode", "subjects"]);
        if (!consolidated[uid]) {
            // Initialize the consolidated object for this uid
            consolidated[uid] = Object.assign(Object.assign({ uid, level: result.class }, rest), { firstTutorial: [], firstSemester: [], secondTutorial: [], secondSemester: [], thirdTutorial: [], thirdSemester: [] });
        }
        // Add subjects to the appropriate semester based on examCode
        if (examCode === "2401") {
            consolidated[uid].firstTutorial.push(...subjects);
        }
        else if (examCode === "2402") {
            consolidated[uid].firstSemester.push(...subjects);
        }
        else if (examCode === "2403") {
            consolidated[uid].secondTutorial.push(...subjects);
        }
        else if (examCode === "2404") {
            consolidated[uid].secondSemester.push(...subjects);
        }
        else if (examCode === "2405") {
            consolidated[uid].thirdTutorial.push(...subjects);
        }
        else if (examCode === "2406") {
            consolidated[uid].thirdSemester.push(...subjects);
        }
    });
    // Return the consolidated objects as an array
    return Object.values(consolidated);
}
function getStudentInfo(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const student = yield student_1.Student.findOne({ uid: uid });
            return student;
        }
        catch (error) {
            return null;
        }
    });
}
