import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const contactEmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.contact_email,
    pass: process.env.contact_email_app_pass,
  },
});
const mainEmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email_address,
    pass: process.env.email_pass,
  },
});
const infoEmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.info_email,
    pass: process.env.info_email_app_pass,
  },
});

export { contactEmailTransporter, mainEmailTransporter, infoEmailTransporter };
