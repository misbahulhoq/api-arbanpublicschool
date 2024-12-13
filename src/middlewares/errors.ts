import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { envValidator } from "../utils/envValidator";

const requiredEnv = [
  "jwtPrivateKey",
  "dbUserName",
  "dbPass",
  "email_address",
  "email_pass",
];

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
  console.log(err);
};

export default globalErrorHandler;
