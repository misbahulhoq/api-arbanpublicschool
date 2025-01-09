import e from "express";
import { verifyAdmin, verifyTeacher, verifyUser } from "../middlewares/auth";
import Teacher, { validateTeacher } from "../models/teacher";
const teachersRouter = e.Router();

teachersRouter.get("/", async (req, res) => {
  const allTeachers = await Teacher.find();
  res.send(allTeachers);
});

teachersRouter.get("/:id", async (req, res) => {
  const foundTeacher = await Teacher.findById(req.params.id);
  if (!foundTeacher)
    return res.status(404).send({ mesage: "No  teacher found" });
  res.send(foundTeacher);
});

teachersRouter.post(
  "/",
  verifyUser,
  verifyTeacher,
  verifyAdmin,
  async (req, res) => {
    const { error } = validateTeacher(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const teacher = await new Teacher(req.body).save();
    res.send(teacher);
  }
);

teachersRouter.put(
  "/:id",
  verifyUser,
  verifyTeacher,
  verifyAdmin,
  async (req, res) => {
    const foundTeacher = await Teacher.findById(req.params.id);
    if (!foundTeacher)
      return res.status(404).send({ message: "No teacher found" });
    const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.send(updated);
  }
);

teachersRouter.delete(
  "/:id",
  verifyUser,
  verifyTeacher,
  verifyAdmin,
  async (req, res) => {
    const foundTeacher = await Teacher.findById(req.params.id);
    if (!foundTeacher)
      return res.status(404).send({ message: "No teacher found." });
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    res.send(deletedTeacher);
  }
);

export default teachersRouter;
