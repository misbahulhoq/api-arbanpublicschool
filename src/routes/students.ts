import express, { Request, Response } from "express";
import { verifyTeacher, verifyUser } from "../middlewares/auth";
import { Student, validateStudent } from "../models/student";
const studentsRouter = express.Router();

studentsRouter.post(
  "/",
  verifyUser,
  verifyTeacher,
  async (req: Request, res: Response) => {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const studentExists = await Student.findOne({ uid: req.body.uid });
    if (studentExists) return res.status(400).send("Student already exists");

    const student = new Student(req.body);
    await student.save();
    res.send(student);
  }
);

studentsRouter.get(
  "/",
  verifyUser,
  verifyTeacher,
  async (req: Request, res: Response) => {
    const validClasses = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "all",
    ];
    if (!validClasses.includes(req.query?.class as string)) {
      return res
        .status(400)
        .send("The class is not valid.. Class must be between 1 and 10.");
    }
    const query = { class: req.query?.class };

    const students = await Student.find(req.query.class !== "all" ? query : {});
    res.send(students);
  }
);

export default studentsRouter;
