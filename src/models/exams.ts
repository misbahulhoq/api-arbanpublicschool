import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  examYear: {
    type: String,
    required: true,
    default: new Date().getFullYear(),
  },
  examCode: {
    type: String,
    required: true,
  },
});

const Exam = mongoose.model("exam", examSchema);

export default Exam;
