import Joi from "joi";
import { model, Schema } from "mongoose";

type NumberType = {
  uid: string;
  class: string;
  exam: string;
  examYear: string;
  fullMarks: number;
  examCode: string;
  subjects: {
    name: string;
    fullMarks: number;
    obtMarks: number;
    slug: string;
  }[];
};

const numberSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  class: {
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
  examYear: {
    type: String,
    required: true,
  },
  subjects: [
    {
      name: { type: String, required: true },
      fullMarks: { type: Number, required: true },
      obtMarks: { type: Number, required: true },
      percentage: { type: Number, required: true },
      slug: { type: String, required: true },
    },
  ],
});

const Num = model("number", numberSchema);

const validateNumber = (number: NumberType) => {
  const schema = Joi.object({
    uid: Joi.string().required().min(6).max(6),
    class: Joi.string().required(),
    examYear: Joi.string().required(),
    fullMarks: Joi.number().optional(),
    exam: Joi.string().required(),
    examCode: Joi.string().required().min(4).max(4),
    subjects: Joi.array().required(),
  });
  return schema.validate(number);
};

export { Num, validateNumber };
