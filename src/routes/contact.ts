import express, { Request, Response } from "express";
import { contactEmailTransporter } from "../utils/emailTransport";
import Joi from "joi";
const contactRouter = express.Router();

contactRouter.post("/", async (req: Request, res: Response) => {
  const { error } = validateContactFormData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  contactEmailTransporter.sendMail(
    {
      from: process.env.contact_email,
      to: process.env.email_address,
      subject: req.body.subject || "",
      html: `
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">

         <table width="100%" style="background-color: #f9f9f9; padding: 20px;">
        <tr>
        <td>
        <table width="600" align="center" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background-color: #4caf50; color: #ffffff; padding: 15px; text-align: center; font-size: 24px; font-weight: bold;">
              New Message Received
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; color: #333333; font-size: 16px;">
              <p style="margin: 0; font-size: 18px; font-weight: bold;">Hello,</p>
              <p style="margin: 10px 0;">You have received a new message. Here are the details:</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Name:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Phone:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #eeeeee; font-weight: bold; background-color: #f9f9f9;">Message:</td>
                  <td style="padding: 10px; border: 1px solid #eeeeee;">${req.body.message}</td>
                </tr>
              </table>
              <p style="margin: 20px 0 0; font-size: 14px; color: #666666;">If you have any questions, feel free to contact us.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #4caf50; color: #ffffff; text-align: center; padding: 10px; font-size: 14px;">
              &copy; 2024 Your Company. All rights reserved.
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
        return res.status(500).send(err.message);
      } else {
        return res.send(info);
      }
    }
  );
});

type contactFormType = {
  name: string;
  phone: string;
  subject?: string;
  message: string;
};

function validateContactFormData(data: contactFormType) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    phone: Joi.string().required().min(11),
    subject: Joi.optional(),
    message: Joi.required(),
  });
  return schema.validate(data);
}

export default contactRouter;
