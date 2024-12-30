import express from "express";
import Joi from "joi";
import { contactEmailTransporter } from "../utils/emailTransport";

const admissionRouter = express.Router();

admissionRouter.post("/", async (req, res) => {
  const { error } = admissionFormValidator(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  contactEmailTransporter.sendMail(
    {
      from: process.env.contact_email,
      to: [
        process.env.email_address as string,
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
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${
                    req.body.fullName
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Email:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${
                    req.body.email || "N/A"
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Phone:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${
                    req.body.phone
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Date of Birth:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${
                    req.body.dob
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Address:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${
                    req.body.address
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Father's Name:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${
                    req.body.fatherName
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Mother's Name:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${
                    req.body.motherName
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Parent Contact:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${
                    req.body.parentContact
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Previous School:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${
                    req.body.previousSchool || "N/A"
                  }</td>
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
    },
    (err, info) => {
      if (err) {
        return res.status(500).send({ mesage: "Something went wrong." });
      } else {
        res.send(info);
      }
    }
  );
});

type AdmissionFormData = {
  fullName: string;
  email?: string;
  phone: string;
  dob: string;
  address: string;
  fatherName: string;
  motherName: string;
  parentContact: string;
  previousSchool?: string;
};
function admissionFormValidator(data: AdmissionFormData) {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().optional().allow(""),
    phone: Joi.string()
      .required()
      .regex(/^(?:\+88)?01[3-9]\d{8}$/),
    dob: Joi.date().required(),
    address: Joi.string().required(),
    fatherName: Joi.string().required(),
    motherName: Joi.string().required(),
    parentContact: Joi.string()
      .required()
      .regex(/^(?:\+88)?01[3-9]\d{8}$/)
      .min(11),
    previousSchool: Joi.string().optional().allow(""),
  });
  return schema.validate(data);
}

export default admissionRouter;
