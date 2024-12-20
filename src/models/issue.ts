import Joi from "joi";
import { model, Schema } from "mongoose";

type IssueType = {
  submittedBy: string;
  subject?: string;
  issue: string;
  priority: "low" | "medium" | "high";
  status: "open" | "pending" | "closed";
};
const issueSchema = new Schema({
  submittedBy: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    default: "Found an issue at Arban Public School's Site.",
  },
  issue: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Issue = model("issue", issueSchema);

export function validateIssue(data: IssueType) {
  const schema = Joi.object({
    submittedBy: Joi.string().required(),
    subject: Joi.string().optional().allow(""),
    issue: Joi.string().required(),
    priority: Joi.string().required(),
    status: Joi.string().required(),
  });
  return schema.validate(data);
}

export default Issue;
