import { Express } from "express";
import authRouter from "../routes/auth";
import studentsRouter from "../routes/students";

export default function routes(app: Express) {
  app.use("/auth", authRouter);
  app.use("/students", studentsRouter);
}
