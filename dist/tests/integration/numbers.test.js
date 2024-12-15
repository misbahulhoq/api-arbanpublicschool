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
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require("../.."));
const number_1 = require("../../models/number");
const user_1 = require("../../models/user");
const student_1 = require("../../models/student");
// @ts-ignore
let server;
describe("/numbers", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        server = __1.default;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        server.close();
        yield number_1.Num.deleteMany({});
    }));
    describe("/POST", () => {
        let uid, exam, examCode, numbers, authToken, user;
        const execute = () => {
            return (0, supertest_1.default)(server)
                .post("/numbers")
                .set("authToken", authToken)
                .send({ uid, exam, examCode, numbers });
        };
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield new student_1.Student({
                uid: "123456",
                class: "7",
                email: "xyz@arban.com",
                fathersName: "abc",
                mothersName: "abc",
                name: "abcde",
                phone: "01234567890",
            }).save();
            (uid = "123456"),
                (exam = "first tutorial"),
                (examCode = "2401"),
                (authToken = new user_1.User({
                    email: "test@gmail",
                    role: "teacher",
                    password: "somepass",
                    uid: "123456",
                }).generateAuthToken());
            numbers = [{ sub: "bangla", fullMarks: 60, obtMarks: 10 }];
        }));
        it("should return 400 authToken is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            authToken = "";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 authToken is not valid", () => __awaiter(void 0, void 0, void 0, function* () {
            authToken = "asjdfkasdl;fsdkf";
            const response = yield execute();
            expect(response.status).toBe(401);
        }));
        it("should return 403 if user is not a teacher", () => __awaiter(void 0, void 0, void 0, function* () {
            authToken = new user_1.User({
                email: "test@gmail",
                role: "student",
                password: "somepass",
                uid: "123456",
            }).generateAuthToken();
            const response = yield execute();
            expect(response.status).toBe(403);
        }));
        it("should return 400 if uid is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            uid = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if uid is less than 6 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            uid = "12";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if uid is more than 6 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            uid = "1234567";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if examname is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            exam = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if examCode is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            examCode = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if examCode is less than 4 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            examCode = "12";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if examCode is more than 4 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            examCode = "1234567";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if numbers array is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            numbers = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 200 if uid everything is okay", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield execute();
            expect(response.status).toBe(200);
        }));
    });
    describe("/GET", () => { });
    describe("/PUT", () => { });
});
