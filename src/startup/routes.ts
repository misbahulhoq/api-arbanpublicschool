import { Express } from "express";
import authRouter from "../routes/auth";
import studentsRouter from "../routes/students";
import numbersRouter from "../routes/numbers";
import contactRouter from "../routes/contact";
import admissionRouter from "../routes/admission";
import issuesRouter from "../routes/issue";
import usersRouter from "../routes/users";

export default function routes(app: Express) {
  app.use("/auth", authRouter);
  app.use("/students", studentsRouter);
  app.use("/numbers", numbersRouter);
  app.use("/contact", contactRouter);
  app.use("/admissions", admissionRouter);
  app.use("/issues", issuesRouter);
  app.use("/users", usersRouter);
}
