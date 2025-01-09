import { Express } from "express";
import authRouter from "../routes/auth";
import studentsRouter from "../routes/students";
import numbersRouter from "../routes/numbers";
import contactRouter from "../routes/contact";
import admissionRouter from "../routes/admission";
import issuesRouter from "../routes/issue";
import usersRouter from "../routes/users";
import noticesRouter from "../routes/notices";
import eventsRouter from "../routes/events";
import teachersRouter from "../routes/teacher";

export default function routes(app: Express) {
  app.use("/auth", authRouter);
  app.use("/students", studentsRouter);
  app.use("/teachers", teachersRouter);
  app.use("/numbers", numbersRouter);
  app.use("/contact", contactRouter);
  app.use("/admissions", admissionRouter);
  app.use("/issues", issuesRouter);
  app.use("/users", usersRouter);
  app.use("/notices", noticesRouter);
  app.use("/events", eventsRouter);
}
