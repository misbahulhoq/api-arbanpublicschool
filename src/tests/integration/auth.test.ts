import request from "supertest";
import { User } from "../../models/user";
import svr from "../..";
import { Server, IncomingMessage, ServerResponse } from "http";
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
      name: string | undefined,
      password: string | undefined,
      uid: string | undefined,
      role: string | undefined;

    beforeEach(() => {
      email = "test@email.com";
      name = "realname";
      password = "truepass";
      uid = "123456";
      role = "student";
    });

    const execute = () => {
      return request(server)
        .post("/auth/signup")
        .send({ email, name, password, uid, role });
    };

    it("should return 400 if email is not provided", async () => {
      email = undefined;
      const response = await execute();
      expect(response.status).toBe(400);
    });

    it("should return 400 if name is not provided", async () => {
      name = undefined;
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

    it("should return 200 if valid signup data is passed", async () => {
      const response = await execute();
      expect(response.status).toBe(200);
      expect(response.body).not.toHaveProperty("password");
    });
  });
});
