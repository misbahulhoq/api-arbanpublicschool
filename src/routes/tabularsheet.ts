import e from "express";
import Joi from "joi";
import { Num } from "../models/number";
const tabularsheet = e.Router();

function validateTabularSheetQuery(query: any) {
  const schema = Joi.object({
    examYear: Joi.string().required().min(4),
    level: Joi.string().required(),
    examCode: Joi.string().required(),
  });
  return schema.validate(query);
}
tabularsheet.get("/", async (req, res) => {
  const { error } = validateTabularSheetQuery(req.query);
  if (error) return res.status(400).send({ error: error.details[0].message });
  const numbers = await Num.find({
    examCode: req.query.examCode,
    class: req.query.level,
    examYear: req.query.examYear,
  });
  res.send(numbers);
});

export default tabularsheet;
