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
const issue_1 = __importStar(require("../models/issue"));
const auth_1 = require("../middlewares/auth");
const issuesRouter = express_1.default.Router();
issuesRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, issue_1.validateIssue)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const issue = new issue_1.default(req.body);
    if (req.body.subject === "")
        issue.subject = "Found an issue at Arban Public School's Site.";
    const response = yield issue.save();
    res.send(response);
}));
issuesRouter.get("/", auth_1.verifyUser, auth_1.verifyTeacher, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const issues = yield issue_1.default.find();
    res.send(issues);
}));
issuesRouter.delete("/:id", auth_1.verifyUser, auth_1.verifyAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundIssue = yield issue_1.default.findOne({ _id: req.params.id });
    if (!foundIssue)
        return res
            .status(404)
            .send({ message: "No issue found with the given id" });
    const deleted = yield issue_1.default.deleteOne({ _id: req.params.id });
    res.send(deleted);
}));
exports.default = issuesRouter;
