import Joi from "joi";
import { model, Schema } from "mongoose";

type StudentType = {
  name: string;
  uid: string;
  class: string;
  phone: string;
  fathersName: string;
  mothersName: string;
};

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fathersName: {
    type: String,
    required: true,
  },
  mothersName: {
    type: String,
    required: true,
  },
});

const Student = model("student", studentSchema);

function validateStudent(student: StudentType) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    uid: Joi.string().min(6).max(6).required(),
    class: Joi.string().min(1).max(2).required(),
    phone: Joi.string().min(11).max(20).required(),
    email: Joi.string().min(10).max(30).required(),
    fathersName: Joi.string().min(3).required(),
    mothersName: Joi.string().min(3).required(),
  });
  return schema.validate(student);
}

export { Student, validateStudent };
