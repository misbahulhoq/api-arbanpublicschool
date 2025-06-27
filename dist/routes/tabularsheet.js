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
const joi_1 = __importDefault(require("joi"));
const number_1 = require("../models/number");
const tabularsheet = express_1.default.Router();
function validateTabularSheetQuery(query) {
    const schema = joi_1.default.object({
        examYear: joi_1.default.string().required().min(4),
        level: joi_1.default.string().required(),
        examCode: joi_1.default.string().required(),
    });
    return schema.validate(query);
}
tabularsheet.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateTabularSheetQuery(req.query);
    if (error)
        return res.status(400).send({ error: error.details[0].message });
    const numbers = yield number_1.Num.find({
        examCode: req.query.examCode,
        class: req.query.level,
        examYear: req.query.examYear,
    });
    res.send(numbers);
}));
exports.default = tabularsheet;
