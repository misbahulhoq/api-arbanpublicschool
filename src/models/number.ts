import Joi from "joi";
import { model, Schema } from "mongoose";

type NumberType = {
  uid: string;
  exam: string;
  examCode: string;
  numbers: { sub: string; fullMarks: number; obtMarks: number }[];
};

const numberSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  exam: {
    type: String,
    required: true,
  },
  examCode: {
    type: String,
    required: true,
  },
  numbers: [
    {
      sub: { type: String, required: true },
      fullMarks: { type: Number, required: true },
      obtMarks: { type: Number, required: true },
    },
  ],
});

const Num = model("number", numberSchema);

const validateNumber = (number: NumberType) => {
  const schema = Joi.object({
    uid: Joi.string().required().min(6).max(6),
    exam: Joi.string().required(),
    examCode: Joi.string().required().min(4).max(4),
    numbers: Joi.array().required(),
  });
  return schema.validate(number);
};

export { Num, validateNumber };
