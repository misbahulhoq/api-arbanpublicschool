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
// @ts-ignore
let server;
describe("/admission", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        server = __1.server;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        server.close();
    }));
    describe("/POST", () => {
        const validData = {
            fullName: "John Doe",
            email: "johndoe@example.com",
            phone: "+8801674044993",
            dob: "2000-01-01",
            address: "123 Street, Dhaka",
            fatherName: "Mr. Doe",
            motherName: "Mrs. Doe",
            parentContact: "+8801674044993",
            previousSchool: "Example School",
        };
        it("should return 400 if validation fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server)
                .post("/admissions")
                .send(Object.assign(Object.assign({}, validData), { phone: "invalid-phone" }));
            expect(response.status).toBe(400);
            expect(response.text).toContain("fails to match the required pattern");
        }));
        it("should send an email and return 200 on valid data", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server)
                .post("/admissions")
                .send(validData);
            expect(response.status).toBe(200);
        }));
    });
});
