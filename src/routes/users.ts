import e from "express";
import { verifyAdmin, verifyTeacher, verifyUser } from "../middlewares/auth";
import { User, validateUser } from "../models/user";
import bcrypt from "bcryptjs";
const usersRouter = e.Router();
async function hashPass(pass: string) {
  const saltRounds = 10;
  try {
    const hashed = await bcrypt.hash(pass, saltRounds);
    return hashed;
  } catch (ex: any) {
    throw new Error("Error in hashing password " + ex.message);
  }
}
usersRouter.post(
  "/",
  verifyUser,
  verifyTeacher,
  verifyAdmin,
  async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const foundUser = await User.findOne({ uid: req.body.uid });
    if (foundUser) return res.status(400).send("User Id already taken");
    const newUser = new User(req.body);
    newUser.password = await hashPass(req.body.password);
    await newUser.save();
    const userObject = newUser.toJSON();
    delete userObject.password;
    res.send(userObject);
  }
);

usersRouter.get(
  "/",
  verifyUser,
  verifyTeacher,
  verifyAdmin,
  async (req, res) => {
    const allUsers = await User.find().select("-password");
    res.send(allUsers);
  }
);

export default usersRouter;
