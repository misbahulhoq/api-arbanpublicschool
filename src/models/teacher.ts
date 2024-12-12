import Joi from "joi";
import { model, Schema } from "mongoose";

type TeacherType = {
  name: string;
  phone: string;
  photoUrl: string;
};

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
});

const Teacher = model("teacher", teacherSchema);

function validateTeacher(teacher: TeacherType) {
  const schema = Joi.object({
    name: Joi.string().required().min(5),
    phone: Joi.string().required().min(11),
    photoUrl: Joi.string().required(),
  });

  return schema.validate(teacher);
}
export { validateTeacher };

export default Teacher;
