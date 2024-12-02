import express, { Request, Response } from "express";
import { verifyTeacher, verifyUser } from "../middlewares/auth";
import { Num, validateNumber } from "../models/number";

const numbersRouter = express.Router();

numbersRouter.post(
  "/",
  verifyUser,
  verifyTeacher,
  async (req: Request, res: Response) => {
    const { error } = validateNumber(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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
