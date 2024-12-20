import express from "express";
import Issue, { validateIssue } from "../models/issue";
import { verifyAdmin, verifyTeacher, verifyUser } from "../middlewares/auth";
const issuesRouter = express.Router();

issuesRouter.post("/", async (req, res) => {
  const { error } = validateIssue(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const issue = new Issue(req.body);
  if (req.body.subject === "")
    issue.subject = "Found an issue at Arban Public School's Site.";
  const response = await issue.save();
  res.send(response);
});
issuesRouter.get("/", verifyUser, verifyTeacher, async (req, res) => {
  const issues = await Issue.find();
  res.send(issues);
});
issuesRouter.delete("/:id", verifyUser, verifyAdmin, async (req, res) => {
  const foundIssue = await Issue.findOne({ _id: req.params.id });

  if (!foundIssue)
    return res
      .status(404)
      .send({ message: "No issue found with the given id" });
  const deleted = await Issue.deleteOne({ _id: req.params.id });
  res.send(deleted);
});

export default issuesRouter;
