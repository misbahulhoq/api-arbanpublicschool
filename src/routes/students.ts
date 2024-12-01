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

export default studentsRouter;
