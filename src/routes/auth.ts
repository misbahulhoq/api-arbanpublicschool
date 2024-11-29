import express, { Request, Response } from "express";
import { User, validateUser } from "../models/user";
import bcrypt from "bcrypt";
import { verifyUser } from "../middlewares/auth";
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

  let userExists = await User.findOne({ uid: req.body.uid });
  if (userExists)
    return res
      .status(400)
      .send({ code: "uid-exists", message: "User id already exists." });

  let user = new User(req.body);
  user.password = await hashPass(req.body.password);
  user = await user.save();
  res.send({ _id: user._id, name: user.name, uid: user.uid });
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email, uid: req.body.uid });
  if (!user) return res.status(401).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password as string
  );
  if (!validPassword) return res.status(401).send("Invalid email or password.");

  const token = user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    //maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    maxAge: 5 * 60 * 1000, //5 minutes
  });
  res.status(200).send({
    name: user.name,
    email: user.email,
    uid: user.uid,
    loginSuccess: true,
  });
});

authRouter.get("/me", verifyUser, async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findById(req.user._id, ["-password"]);
  res.send(user);
});

export default authRouter;
