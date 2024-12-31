import e from "express";
import { verifyAdmin, verifyTeacher, verifyUser } from "../middlewares/auth";
import { Notice, validateNotice } from "../models/notice";
import { Student } from "../models/student";
import { infoEmailTransporter } from "../utils/emailTransport";
const noticesRouter = e.Router();

noticesRouter.post(
  "/",
  verifyUser,
  verifyTeacher,
  verifyAdmin,
  async (req, res) => {
    const { error } = validateNotice(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // for now this is just students email, later I will also add teachers email here.
    let studentsEmail = await Student.aggregate([
      {
        $group: {
          _id: "$email", // Group by the email key
        },
      },
      {
        $project: {
          email: "$_id", // Include the grouped email
          _id: 0, // Exclude the default `_id`
        },
      },
    ]);
    studentsEmail = studentsEmail.map((i) => i.email);
    infoEmailTransporter.sendMail({
      from: process.env.info_email,
      to: studentsEmail,
    });
    const notice = await new Notice(req.body).save();
    res.send(notice);
  }
);

noticesRouter.get("/", async (req, res) => {
  const studentsEmail = await Student.aggregate([
    {
      $group: {
        _id: "$email", // Group by the email key
      },
    },
    {
      $project: {
        email: "$_id", // Include the grouped email
        _id: 0, // Exclude the default `_id`
      },
    },
  ]);
  res.send(studentsEmail);
});

export default noticesRouter;
