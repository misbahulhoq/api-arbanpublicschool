import Joi from "joi";
import { Model, Schema } from "mongoose";

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
  phone: {
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

const Student = new Model("student", studentSchema);

function validateStudent(student: StudentType) {
  const schema = Joi.object({
    name: Joi.string().required(),
    uid: Joi.string().required(),
    class: Joi.string().required(),
    phone: Joi.string().required(),
    fathersName: Joi.string().required(),
    mothersName: Joi.string().required(),
  });
  return schema.validate(student);
}

export { Student, validateStudent };
