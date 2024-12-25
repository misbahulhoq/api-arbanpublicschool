import request from "supertest";
import { server as svr } from "../..";
import { Server, IncomingMessage, ServerResponse } from "http";
import { contactEmailTransporter } from "../../utils/emailTransport";
// @ts-ignore
let server: Server<IncomingMessage, ServerResponse>;

describe("/admission", () => {
  beforeEach(async () => {
    // @ts-ignore
    server = svr;
  });
  afterEach(async () => {
    server.close();
  });
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
    it("should return 400 if validation fails", async () => {
      const response = await request(server)
        .post("/admissions")
        .send({ ...validData, phone: "invalid-phone" });
      expect(response.status).toBe(400);
      expect(response.text).toContain("fails to match the required pattern");
    });

    it("should send an email and return 200 on valid data", async () => {
      const response = await request(server)
        .post("/admissions")
        .send(validData);
      expect(response.status).toBe(200);
    });
  });
});
