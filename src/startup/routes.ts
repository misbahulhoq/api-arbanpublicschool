import { Express } from "express";
import authRouter from "../routes/auth";

export default function routes(app: Express) {
  app.use("/auth", authRouter);
}
