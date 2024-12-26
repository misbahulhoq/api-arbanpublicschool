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
const __1 = require("../..");
const student_1 = require("../../models/student");
const user_1 = require("../../models/user");
// @ts-ignore
let server;
describe("/students", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        server = __1.server;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.close();
        yield student_1.Student.deleteMany({});
    }));
    describe("/POST", () => {
        let user = new user_1.User({
            email: "test@gmail.com",
            password: "asldjkf",
            role: "teacher",
            uid: "123445",
        });
        let name, uid, className, phone, email, fathersName, mothersName, authToken;
        beforeEach(() => {
            name = "abc";
            uid = "123456";
            className = "7";
            phone = "01521377999";
            email = "xyz@arban.com";
            fathersName = "abc";
            mothersName = "cdb";
            authToken = user.generateAuthToken();
        });
        afterEach(() => {
            user.role = "teacher";
        });
        const execute = () => {
            return (0, supertest_1.default)(server)
                .post("/students")
                .set("authToken", authToken)
                .send({
                name,
                uid,
                class: className,
                phone,
                email,
                fathersName,
                mothersName,
            });
        };
        it("should return 400 if auth token is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            authToken = "";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 401 if invalid token provided", () => __awaiter(void 0, void 0, void 0, function* () {
            authToken = "something else token is not valid";
            const response = yield execute();
            expect(response.status).toBe(401);
        }));
        it("should return 403 if role is not teacher", () => __awaiter(void 0, void 0, void 0, function* () {
            user.role = "student";
            authToken = user.generateAuthToken();
            const response = yield execute();
            expect(response.status).toBe(403);
        }));
        it("should return 400 if name is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            name = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if name is less than 3 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            name = "a";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if uid is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            uid = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if uid is less than 6 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            uid = "12345";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if uid  is more than 6 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            uid = "1234567";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if class is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            className = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if class is less than 1 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            className = "";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if class is more than 2 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            className = "122";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if phone is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            phone = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if phone is less than 11 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            phone = "undefined";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if phone is greater than 20 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            phone = "0123456789145454545454545454";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if email is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            email = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if email is less than 10 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            email = "abc";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if email is greater than 30 characters", () => __awaiter(void 0, void 0, void 0, function* () {
            email = "0123456789145454545454545454somemoretextwillgohere";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if fathersName is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            fathersName = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if mothersName is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            mothersName = undefined;
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if one uid is used twice", () => __awaiter(void 0, void 0, void 0, function* () {
            yield execute();
            uid = "123456";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 200 if everything is okay", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield execute();
            expect(response.status).toBe(200);
        }));
    });
    describe("/GET", () => {
        let user = new user_1.User({
            email: "test@gmail.com",
            password: "asldjkf",
            role: "teacher",
            uid: "123445",
        });
        let authToken;
        beforeEach(() => {
            authToken = user.generateAuthToken();
        });
        afterEach(() => {
            user.role = "teacher";
        });
        const execute = () => {
            return (0, supertest_1.default)(server).get("/students").set("authToken", authToken);
        };
        it("should return 400 if authToken is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
            authToken = "";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 401 if authToken is not valid", () => __awaiter(void 0, void 0, void 0, function* () {
            authToken = "some invalid token";
            const response = yield execute();
            expect(response.status).toBe(401);
        }));
        it("should return 403 if user is not teacher", () => __awaiter(void 0, void 0, void 0, function* () {
            user.role = "student";
            const response = yield execute();
            expect(response.status).toBe(400);
        }));
        it("should return 400 if query is not between 1 and 10", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server)
                .get("/students")
                .query({ class: "15" })
                .set("authToken", authToken);
            expect(response.status).toBe(400);
        }));
    });
});
