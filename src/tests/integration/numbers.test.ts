import request from "supertest";
import { server as svr } from "../..";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Num } from "../../models/number";
import { User } from "../../models/user";
import { Student } from "../../models/student";

// @ts-ignore
let server: Server<IncomingMessage, ServerResponse>;

describe("/numbers", () => {
  beforeEach(async () => {
    // @ts-ignore
    server = svr;
  });
  afterEach(async () => {
    server.close();
    await Num.deleteMany({});
  });

  describe("/POST", () => {
    let uid: string | undefined,
      exam: string | undefined,
      examCode: string | undefined,
      numbers: any[] | undefined,
      authToken: string | undefined,
      user;
    const execute = () => {
      return request(server)
        .post("/numbers")
        .set("authToken", authToken as string)
        .send({ uid, exam, examCode, numbers });
    };
    beforeEach(async () => {
      await new Student({
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
        (authToken = new User({
          email: "test@gmail",
          role: "teacher",
          password: "somepass",
          uid: "123456",
        }).generateAuthToken());
      numbers = [{ sub: "bangla", fullMarks: 60, obtMarks: 10 }];
    });
    it("should return 400 authToken is not provided", async () => {
      authToken = "";
      const response = await execute();
      expect(response.status).toBe(400);
    });

    it("should return 400 authToken is not valid", async () => {
      authToken = "asjdfkasdl;fsdkf";
      const response = await execute();
      expect(response.status).toBe(401);
    });

    it("should return 403 if user is not a teacher", async () => {
      authToken = new User({
        email: "test@gmail",
        role: "student",
        password: "somepass",
        uid: "123456",
      }).generateAuthToken();
      const response = await execute();
      expect(response.status).toBe(403);
    });

    it("should return 400 if uid is not provided", async () => {
      uid = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if uid is less than 6 characters", async () => {
      uid = "12";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if uid is more than 6 characters", async () => {
      uid = "1234567";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if examname is not provided", async () => {
      exam = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if examCode is not provided", async () => {
      examCode = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if examCode is less than 4 characters", async () => {
      examCode = "12";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if examCode is more than 4 characters", async () => {
      examCode = "1234567";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if numbers array is not provided", async () => {
      numbers = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 200 if uid everything is okay", async () => {
      const response = await execute();
      expect(response.status).toBe(200);
    });
  });
  describe("/GET", () => {});
  describe("/PUT", () => {});
});
