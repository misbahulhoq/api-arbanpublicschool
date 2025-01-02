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
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const emailTransport_1 = require("../utils/emailTransport");
const admissionRouter = express_1.default.Router();
admissionRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = admissionFormValidator(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });
    emailTransport_1.contactEmailTransporter.sendMail({
        from: process.env.contact_email,
        to: [
            process.env.email_address,
            "extraordinarymisbah@gmail.com",
        ],
        subject: "New Admission Form Received.",
        html: `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">

  <table width="100%" style="background-color: #f9f9f9; padding: 20px;">
    <tr>
      <td>
        <table width="600" align="center" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background-color: #4caf50; color: #ffffff; padding: 15px; text-align: center; font-size: 24px; font-weight: bold;">
              Student Information
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; color: #333333; font-size: 16px;">
              <p style="margin: 0; font-size: 18px; font-weight: bold;">Hello,</p>
              <p style="margin: 10px 0;">Here are the details of the student:</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Full Name:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Email:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.email || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Phone:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Date of Birth:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.dob}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Address:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.address}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Father's Name:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.fatherName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Mother's Name:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.motherName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Parent Contact:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.parentContact}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Previous School:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.previousSchool || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Submission Time:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <p style="margin: 20px 0 0; font-size: 14px; color: #666666;">If you have any questions, feel free to contact us.</p>
              <p style="margin: 10px 0 0; font-size: 14px; color: #666666;">
                Email: <a href="mailto:contact.arbanpublicschool@gmail.com" style="color: #4caf50; text-decoration: none;">contact.arbanpublicschool@gmail.com</a>
                </p>
              <p style="margin: 5px 0 0; font-size: 14px; color: #666666;">
               Phone: <a href="tel:+8801674044993" style="color: #4caf50; text-decoration: none;">+8801674044993</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #4caf50; color: #ffffff; text-align: center; padding: 10px; font-size: 14px;">
              &copy; ${new Date().getFullYear()} Arban Public School. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>`,
    }, (err, info) => {
        if (err) {
            return res.status(500).send({ mesage: "Something went wrong." });
        }
        else {
            res.send(info);
        }
    });
}));
function admissionFormValidator(data) {
    const schema = joi_1.default.object({
        fullName: joi_1.default.string().required(),
        email: joi_1.default.string().optional().allow(""),
        phone: joi_1.default.string()
            .required()
            .regex(/^(?:\+88)?01[3-9]\d{8}$/),
        dob: joi_1.default.date().required(),
        address: joi_1.default.string().required(),
        fatherName: joi_1.default.string().required(),
        motherName: joi_1.default.string().required(),
        parentContact: joi_1.default.string()
            .required()
            .regex(/^(?:\+88)?01[3-9]\d{8}$/)
            .min(11),
        previousSchool: joi_1.default.string().optional().allow(""),
    });
    return schema.validate(data);
}
exports.default = admissionRouter;
