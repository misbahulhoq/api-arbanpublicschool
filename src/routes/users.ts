import e from "express";
import { verifyAdmin, verifyTeacher, verifyUser } from "../middlewares/auth";
import { User, validateUser } from "../models/user";
const usersRouter = e.Router();

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
    const newUser = await new User(req.body).save();
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
