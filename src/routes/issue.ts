import express from "express";
import Issue, { validateIssue } from "../models/issue";
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
export default issuesRouter;
