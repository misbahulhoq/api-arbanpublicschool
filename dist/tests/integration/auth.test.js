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
const __1 = require("../..");
const student_1 = require("../../models/student");
// @ts-ignore
let server;
describe("/auth", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        server = __1.server;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        server.close();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.User.deleteMany({});
    }));
    let email, password, uid, role, phone;
    describe("/POST", () => {
        describe("/signup", () => {
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                // sending signup post request with the valid info of the signup method
                email = "xyz@arban.com";
                password = "truepass";
                uid = "123456";
                role = "student";
                phone = "01234547891";
                yield new student_1.Student({
                    name: "abcd",
                    uid: "123456",
                    class: "7",
                    phone: "01234547891",
                    email: "xyz@arban.com",
                    fathersName: "abcd",
                    mothersName: "abcd",
                }).save();
            }));
            afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
                yield student_1.Student.deleteMany({});
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
        describe("/login", () => {
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                email = "xyz@arban.com";
                password = "truepass";
                uid = "123456";
                role = "student";
                phone = "01234547891";
            }));
            const execute = () => __awaiter(void 0, void 0, void 0, function* () {
                return (0, supertest_1.default)(server)
                    .post("/auth/login")
                    .send({ email, password, uid });
            });
            const signup = () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, supertest_1.default)(server)
                    .post("/auth/signup")
                    .send({ email, password, uid, role, phone });
            });
            it("should return 401 if user is not found with given email and password", () => __awaiter(void 0, void 0, void 0, function* () {
                yield signup();
                email = "notvalid@gmail.com";
                const response = yield execute();
                expect(response.status).toBe(401);
            }));
            it("should return 401 if user provides a wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
                yield signup();
                password = "falsepass";
                const response = yield execute();
                expect(response.status).toBe(401);
            }));
            it("should return 200 if login credentials are okay", () => __awaiter(void 0, void 0, void 0, function* () {
                yield signup();
                const response = yield execute();
                expect(response.status).toBe(200);
            }));
        });
    });
});
