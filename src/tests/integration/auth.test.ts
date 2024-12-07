import request from "supertest";
import { User } from "../../models/user";
import svr from "../..";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Student } from "../../models/student";
// @ts-ignore
let server: Server<IncomingMessage, ServerResponse>;

describe("auth/signup", () => {
  beforeEach(async () => {
    // @ts-ignore
    server = svr;
  });
  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });

  describe("/POST", () => {
    let email: string | undefined,
      password: string | undefined,
      uid: string | undefined,
      role: string | undefined,
      phone: string | undefined;

    // saving a student in the student collection
    const student = new Student({
      name: "abcd",
      fathersName: "abcd",
      mothersName: "abcd",
      phone: "01234547891",
      email: "xyz@arban.com",
      uid: "123456",
      class: "7",
    });

    beforeEach(async () => {
      // sending signup post request with the valid info of the signup method
      email = "xyz@arban.com";
      password = "truepass";
      uid = "123456";
      role = "student";
      (phone = "01234547891"), await student.save();
    });
    afterEach(async () => {
      // await student.deleteOne();
    });

    const execute = () => {
      return request(server)
        .post("/auth/signup")
        .send({ email, password, uid, role, phone });
    };

    it("should return 400 if email is not provided", async () => {
      email = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if password is not provided", async () => {
      password = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if uid is not provided", async () => {
      uid = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if role is not provided", async () => {
      role = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if one uid is provided more than once", async () => {
      await execute();
      uid = "123456";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if the uid does not match with the database", async () => {
      uid = "123455";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if the email does not match with the database", async () => {
      email = "abc@xyz.com";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if the phone does not match with the database", async () => {
      phone = "01111155555";
      const response = await execute();
      expect(response.status).toBe(400);
    });
    it("should return 400 if someone tries to add an admin from the request", async () => {
      const response = await request(server).post("/auth/signup").send({
        email: "test@gmail.com",
        uid: "123456",
        password: "testpass",
        role: "teacher",
        isAdmin: true,
      });
      expect(response.status).toBe(400);
    });
    it("should return 400 if someone tries to add a teacher from the request", async () => {
      const response = await request(server).post("/auth/signup").send({
        email: "test@gmail.com",
        uid: "123456",
        password: "testpass",
        role: "teacher",
      });
      expect(response.status).toBe(400);
    });
    it("should return 200 if valid signup data is passed", async () => {
      const response = await execute();
      expect(response.status).toBe(200);
      expect(response.body).not.toHaveProperty("password");
    });
  });
});
