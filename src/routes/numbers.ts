import express, { Request, Response } from "express";
import { verifyTeacher, verifyUser } from "../middlewares/auth";
import { Num, validateNumber } from "../models/number";
import { Student } from "../models/student";

const numbersRouter = express.Router();

numbersRouter.post(
  "/",
  verifyUser,
  verifyTeacher,
  async (req: Request, res: Response) => {
    const { error } = validateNumber(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // if the client sends a uid which does not exist return 400
    const foundStudent = await Student.findOne({ uid: req.body.uid });
    if (!foundStudent) {
      return res.status(400).send("Wrong UID.");
    }

    // if a student's number is already saved with a uid and exam code, return 400.
    const numberAlreadySaved = await Num.findOne({
      uid: req.body.uid,
      examCode: req.body.examCode,
    });
    if (numberAlreadySaved) {
      return res
        .status(400)
        .send("Number already saved with this uid and examCode");
    }

    const number = new Num(req.body);
    await number.save();
    res.send(number);
  }
);

numbersRouter.get("/", verifyUser, async (req: Request, res: Response) => {
  const query = req.query.uid;
  if (query) {
    const numbers = await Num.find({ uid: query });
    return res.send(numbers);
  }
  const numbers = await Num.find();
  res.send(numbers);
});

export default numbersRouter;
