import express, { Request, Response } from "express";
import { verifyAdmin, verifyTeacher, verifyUser } from "../middlewares/auth";
import { Student, validateStudent } from "../models/student";
const studentsRouter = express.Router();

studentsRouter.post(
  "/",
  verifyUser,
  verifyTeacher,
  async (req: Request, res: Response) => {
    const { error } = validateStudent(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const studentExists = await Student.findOne({ uid: req.body.uid });
    if (studentExists)
      return res.status(400).send({ message: "Student already exists" });

    const student = new Student(req.body);
    await student.save();
    res.send(student);
  }
);

studentsRouter.get(
  "/",
  verifyUser,
  verifyTeacher,
  async (req: Request, res: Response, next) => {
    const validClasses = [
      "-1",
      "0",
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
        .send("The class is not valid.. Class must be between -1 and 10.");
    }
    const query = { class: req.query?.class };

    const students = await Student.find(req.query.class !== "all" ? query : {});
    res.send(students);
  }
);

studentsRouter.get("/:uid", verifyUser, async (req: Request, res: Response) => {
  const student = await Student.findOne({ uid: req.params.uid });
  if (!student)
    return res.status(404).send("No student found with the given uid.");
  res.send(student);
});

studentsRouter.put(
  "/:uid",
  verifyUser,
  verifyTeacher,
  async (req: Request, res: Response) => {
    // const uid = req.params.uid;
    const studentFound = await Student.findOne({ uid: req.params.uid });
    if (!studentFound)
      return res.status(404).send("No student found with the provided uid");

    const updated = await Student.findOneAndUpdate(
      { uid: req.params.uid },
      req.body,
      { returnDocument: "after" }
    );
    res.send(updated);
  }
);

studentsRouter.delete(
  "/:uid",
  verifyUser,
  verifyTeacher,
  verifyAdmin,
  async (req: Request, res: Response) => {
    const studentFound = await Student.findOne({ uid: req.params.uid });
    if (!studentFound)
      return res.status(404).send("No student found with the provided uid");

    const response = await Student.deleteOne({ uid: req.params.uid });
    res.send(response);
  }
);

export default studentsRouter;
