import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { envValidator } from "../utils/envValidator";
import winston, { createLogger } from "winston";
import { contactEmailTransporter } from "../utils/emailTransport";
const { combine, timestamp, json } = winston.format;
const requiredEnv = [
  "jwtPrivateKey",
  "dbUserName",
  "dbPass",
  "email_address",
  "email_pass",
  "info_email",
  "contact_email",
  "contact_email_app_pass",
];

const logger = createLogger({
  level: "error",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: "errors.log", level: "error" }),
    new winston.transports.Console(),
  ],
});

export const envValidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    envValidator(requiredEnv);
    next();
  } catch (ex) {
    next(ex);
  }
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err.message);
  contactEmailTransporter.sendMail({
    from: process.env.contact_email,
    to: ["extraordinarymisbah@gmail.com"],
    subject: "An error happened in Arban Public School Api",
    html: `
    <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">

    <div style="
        max-width: 500px; 
        width: 100%; 
        background-color: #fff; 
        border-left: 5px solid #e74c3c; 
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
        border-radius: 8px; 
        padding: 20px; 
        text-align: center;
    ">
        <h1 style="color: #e74c3c; font-size: 24px; margin: 0 0 10px;">⚠ Error Occurred</h1>
        <p style="color: #333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
            ${err}
        </p>
    </div>

</body>
    `,
  });
};

export default globalErrorHandler;
