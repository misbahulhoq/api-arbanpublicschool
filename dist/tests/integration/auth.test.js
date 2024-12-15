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
const user_1 = require("../../models/user");
const __1 = __importDefault(require("../.."));
const student_1 = require("../../models/student");
// @ts-ignore
let server;
describe("auth/signup", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        server = __1.default;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        server.close();
        yield user_1.User.deleteMany({});
    }));
    describe("/POST", () => {
        let email, password, uid, role, phone;
        // saving a student in the student collection
        const student = new student_1.Student({
            name: "abcd",
            fathersName: "abcd",
            mothersName: "abcd",
            phone: "01234547891",
            email: "xyz@arban.com",
            uid: "123456",
            class: "7",
        });
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            // sending signup post request with the valid info of the signup method
            email = "xyz@arban.com";
            password = "truepass";
            uid = "123456";
            role = "student";
            (phone = "01234547891"), yield student.save();
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            // await student.deleteOne();
        }));
        const execute = () => {
            return (0, supertest_1.default)(server)
                .post("/auth/signup")
                .send({ email, password, uid, role, phone });
        };
        it("should return 400 if email is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            email = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if password is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            password = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if uid is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            uid = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if role is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            role = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if one uid is provided more than once", () => __awaiter(void 0, void 0, void 0, function* () {
            yield execute();
            uid = "123456";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if the uid does not match with the database", () => __awaiter(void 0, void 0, void 0, function* () {
            uid = "123455";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if the email does not match with the database", () => __awaiter(void 0, void 0, void 0, function* () {
            email = "abc@xyz.com";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if the phone does not match with the database", () => __awaiter(void 0, void 0, void 0, function* () {
            phone = "01111155555";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if someone tries to add an admin from the request", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server).post("/auth/signup").send({
                email: "test@gmail.com",
                uid: "123456",
                password: "testpass",
                role: "teacher",
                isAdmin: true,
            });
            expect(response.status).toBe(400);
        }));
        it("should return 400 if someone tries to add a teacher from the request", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server).post("/auth/signup").send({
                email: "test@gmail.com",
                uid: "123456",
                password: "testpass",
                role: "teacher",
            });
            expect(response.status).toBe(400);
        }));
        it("should return 200 if valid signup data is passed", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield execute();
            expect(response.status).toBe(200);
            expect(response.body).not.toHaveProperty("password");
        }));
    });
});
