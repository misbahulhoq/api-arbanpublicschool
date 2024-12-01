import request from "supertest";
import svr from "../..";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Student } from "../../models/student";
import { User } from "../../models/user";

// @ts-ignore
let server: Server<IncomingMessage, ServerResponse>;

describe("/students", () => {
  beforeEach(async () => {
    // @ts-ignore
    server = svr;
  });
  afterEach(async () => {
    server.close();
    await Student.deleteMany({});
  });
  describe("/POST", () => {
    let user = new User({
      email: "test@gmail.com",
      password: "asldjkf",
      role: "teacher",
      uid: "123445",
    });
    let name: string | undefined,
      uid: string | undefined,
      className: string | undefined,
      phone: string | undefined,
      fathersName: string | undefined,
      mothersName: string | undefined,
      authToken: any;

    beforeEach(() => {
      name = "abc";
      uid = "123456";
      className = "7";
      phone = "01521377999";
      fathersName = "abc";
      mothersName = "cdb";
      authToken = user.generateAuthToken();
    });
    afterEach(() => {
      user.role = "teacher";
    });
    const execute = () => {
      return request(server)
        .post("/students")
        .set("authToken", authToken)
        .send({
          name,
          uid,
          class: className,
          phone,
          fathersName,
          mothersName,
        });
    };
    it("should return 400 if auth token is not provided", async () => {
      authToken = "";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 401 if invalid token provided", async () => {
      authToken = "something else token is not valid";
      const response = await execute();
      expect(response.status).toBe(401);
    });
    it("should return 403 if role is not teacher", async () => {
      user.role = "student";
      authToken = user.generateAuthToken();
      const response = await execute();
      expect(response.status).toBe(403);
    });
    it("should return 400 if name is not provided", async () => {
      name = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if name is less than 3 characters", async () => {
      name = "a";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if uid is not provided", async () => {
      uid = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if uid is less than 6 characters", async () => {
      uid = "12345";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if uid  is more than 6 characters", async () => {
      uid = "1234567";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if class is not provided", async () => {
      className = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if class is less than 1 characters", async () => {
      className = "";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if class is more than 2 characters", async () => {
      className = "122";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if phone is not provided", async () => {
      phone = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if phone is less than 11 characters", async () => {
      phone = "undefined";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if phone is greater than 20 characters", async () => {
      phone = "0123456789145454545454545454";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if fathersName is not provided", async () => {
      fathersName = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if mothersName is not provided", async () => {
      mothersName = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if one uid is used twice", async () => {
      await execute();
      uid = "123456";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 200 if everything is okay", async () => {
      const response = await execute();
      expect(response.status).toBe(200);
    });
  });
  describe("/GET", () => {
    let user = new User({
      email: "test@gmail.com",
      password: "asldjkf",
      role: "teacher",
      uid: "123445",
    });
    let authToken: any;
    beforeEach(() => {
      authToken = user.generateAuthToken();
    });
    afterEach(() => {
      user.role = "teacher";
    });
    const execute = () => {
      return request(server).get("/students").set("authToken", authToken);
    };

    it("should return 400 if authToken is not provided", async () => {
      authToken = "";
      const response = await execute();
      expect(response.status).toBe(400);
    });

    it("should return 401 if authToken is not valid", async () => {
      authToken = "some invalid token";
      const response = await execute();
      expect(response.status).toBe(401);
    });
    it("should return 403 if user is not teacher", async () => {
      user.role = "student";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if query is not between 1 and 10", async () => {
      const response = await request(server)
        .get("/students")
        .query({ class: "15" })
        .set("authToken", authToken);
      expect(response.status).toBe(400);
    });
  });
});
