import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.header("authToken");
  if (!authToken) return res.status(400).send("No token found.");

  try {
    const decoded = jwt.verify(authToken, process.env.jwtPrivateKey as string);
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid or expired token..");
  }
};

const verifyTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const isTeacher = req.user.role === "teacher";
  if (!isTeacher) return res.status(403).send("Forbidden access.");
  next();
};

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) return res.status(403).send("Forbidden access.");
  next();
};

export { verifyUser, verifyTeacher, verifyAdmin };
