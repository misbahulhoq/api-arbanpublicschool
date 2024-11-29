import express, { Request, Response } from "express";
import { User, validateUser } from "../models/user";
import bcrypt from "bcrypt";
import { string } from "joi";
const authRouter = express.Router();

async function hashPass(pass: string) {
  const saltRounds = 10;
  try {
    const hashed = await bcrypt.hash(pass, saltRounds);
    return hashed;
  } catch (ex: any) {
    throw new Error("Error in hashing password " + ex.message);
  }
}

authRouter.post("/signup", async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let userExists = await User.find({ uid: req.body.uid });
  if (userExists) return res.status(400).send("User already exists.");

  let user = new User(req.body);
  user.password = await hashPass(req.body.password);
  user = await user.save();
  res.send(Object.keys(user).filter((item) => item !== "password"));
});

export default authRouter;
