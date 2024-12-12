import e, { Request, Response } from "express";
import { verifyAdmin, verifyTeacher, verifyUser } from "../middlewares/auth";
import Teacher, { validateTeacher } from "../models/teacher";
import { Student } from "../models/student";

const teachersRouter = e.Router();

teachersRouter.get("/", verifyUser, async (req: Request, res: Response) => {
  const allTeachers = await Teacher.find();
  res.send(allTeachers);
});

teachersRouter.post(
  "/",
  verifyUser,
  verifyTeacher,
  verifyAdmin,
  async (req: Request, res: Response) => {
    const { error } = validateTeacher(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const teacher = await new Teacher(req.body).save();
    res.send(teacher);
  }
);

teachersRouter.delete(
  "/",
  verifyUser,
  async (req: Request, res: Response) => {}
);

export default teachersRouter;
