import type { ErrorRequestHandler } from "express";

export const envErrors = () => {
  const error = new Error();

  if (!process.env.jwtPrivateKey) {
    // throw new Error("jwt private key is not defined.");
    error.message = "jwt private key is not defined.";
  }
  if (!process.env.dbUserName) {
    throw new Error("database username is not defined.");
  }
  if (!process.env.dbPass) {
    throw new Error("database password is not defined.");
  }
  if (!process.env.email_address) {
    throw new Error("email address is not defined.");
  }
  if (!process.env.email_pass) {
    throw new Error("email password is not defined.");
  }
};
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {};

export default globalErrorHandler;
