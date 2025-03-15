import express, { Request, Response } from "express";
import { User, validateUser } from "../models/user";
import bcrypt from "bcryptjs";
import { verifyUser } from "../middlewares/auth";
import { Student } from "../models/student";
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

// when signing up, a user should pass valid email, uid and phone. Otherwise 400 wil be thrown.
authRouter.post("/signup", async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.hasOwnProperty("isAdmin") || req.body["role"] !== "student") {
    return res
      .status(400)
      .send("Only student signup is allowed from the frontend.");
  }

  const validStudent = await Student.findOne({
    uid: req.body.uid,
    email: req.body.email,
    phone: req.body.phone,
  });
  if (!validStudent)
    return res.status(400).send("You provided something wrong.");

  let userExists = await User.findOne({ uid: req.body.uid });
  if (userExists)
    return res
      .status(400)
      .send({ code: "uid-exists", message: "User id already exists." });

  let user = new User(req.body);
  user.password = await hashPass(req.body.password);
  user = await user.save();
  res.send({ _id: user._id, uid: user.uid, email: user.email });
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
  res.header("authToken", token).send({
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
