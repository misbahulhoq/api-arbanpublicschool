import express, { Request, Response } from "express";
import { verifyAdmin, verifyTeacher, verifyUser } from "../middlewares/auth";
import { Num, validateNumber } from "../models/number";
import { Student } from "../models/student";

const numbersRouter = express.Router();

numbersRouter.post(
  "/",
  verifyUser,
  verifyTeacher,
  async (req: Request, res: Response) => {
    const { error } = validateNumber(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // if the client sends a uid which does not exist return 400
    const foundStudent = await Student.findOne({ uid: req.body.uid });
    if (!foundStudent) {
      return res.status(400).send({ message: "Wrong UID." });
    }

    // if a student's number is already saved with a uid and exam code, return 400.
    const numberAlreadySaved = await Num.findOne({
      uid: req.body.uid,
      examCode: req.body.examCode,
    });
    if (numberAlreadySaved) {
      return res
        .status(400)
        .send({ message: "Number already saved with this uid and examCode" });
    }

    const number = new Num(req.body);
    await number.save();
    res.send(number);
  }
);

numbersRouter.get(
  "/",
  verifyUser,
  verifyTeacher,
  async (req: Request, res: Response) => {
    const query = req.query;
    console.log(req.query);
    if (query) {
      const numbers = await Num.find(query);
      return res.send(numbers);
    }
    const numbers = await Num.find();
    res.send(numbers);
  }
);

numbersRouter.get("/:uid", verifyUser, async (req: Request, res: Response) => {
  const number = await Num.find({ uid: req.params.uid });
  console.log(number);
  res.send(number);
});

// get a number by id,
numbersRouter.get("/id/:id", verifyUser, verifyTeacher, async (req, res) => {
  const foundNum = await Num.findById(req.params.id);
  if (!foundNum)
    return res
      .status(404)
      .send({ message: "No data found with the provided id" });
  res.send(foundNum);
});

numbersRouter.put(
  "/:uid",
  verifyUser,
  verifyTeacher,
  async (req: Request, res: Response) => {
    const isFound = await Num.findOne({ uid: req.params.uid });
    if (!isFound)
      return res
        .status(404)
        .send({ message: "No data found with the provided uid." });

    const foundNumber = await Num.findOneAndUpdate(
      { uid: req.params.uid },
      req.body
    );
    res.send(foundNumber);
  }
);

numbersRouter.put(
  "/id/:id",
  verifyUser,
  verifyTeacher,
  async (req: Request, res: Response) => {
    const isFound = await Num.findOne({ uid: req.params.uid });
    if (!isFound)
      return res
        .status(404)
        .send({ message: "No data found with the provided uid." });

    const foundNumber = await Num.findOneAndUpdate(
      { uid: req.params.uid },
      req.body
    );
    res.send(foundNumber);
  }
);

export default numbersRouter;
