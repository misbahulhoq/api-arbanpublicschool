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
const number_1 = require("../models/number");
const numberFormatter_1 = require("../lib/utils/numberFormatter");
const student_1 = require("../models/student");
const results = express_1.default.Router();
results.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const numbers = yield number_1.Num.find(query);
    const formattedNums = (0, numberFormatter_1.consolidateNumbers)(numbers);
    const numsWithStuInfo = formattedNums;
    formattedNums.forEach((num, index) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield student_1.Student.findOne({ uid: num.uid });
        // @ts-ignore
        numsWithStuInfo.find((n) => n.uid === student.uid).student = "bal";
    }));
    res.send(numsWithStuInfo[0]);
}));
exports.default = results;
