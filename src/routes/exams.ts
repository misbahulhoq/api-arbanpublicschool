import e from "express";
import Exam from "../models/exams";

const examsRouter = e.Router();

examsRouter.post("/", async (req, res) => {
  const exam = await new Exam(req.body).save();
  res.send(exam);
});

examsRouter.get("/", async (req, res) => {
  const exams = await Exam.find(req.query);
  res.send(exams);
});

export default examsRouter;
