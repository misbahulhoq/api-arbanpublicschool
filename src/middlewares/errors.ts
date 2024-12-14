import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { envValidator } from "../utils/envValidator";
import winston, { createLogger } from "winston";
const { combine, timestamp, json } = winston.format;
const requiredEnv = [
  "jwtPrivateKey",
  "dbUserName",
  "dbPass",
  "email_address",
  "email_pass",
];

const logger = createLogger({
  level: "error",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: "errors.log", level: "error" }),
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
};

export default globalErrorHandler;
