import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).send("No token found.");

  //   const isValidToken = jwt.verify(token, process.env.jwtPrivateKey as string);
  //   if (!isValidToken) return res.status(400).send("Invalid Token..");

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey as string);
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid or expired token..");
  }
};

export { verifyUser };
