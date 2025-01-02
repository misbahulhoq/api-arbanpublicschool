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

    // for now this is just students email, later I will also add teachers emails here.
    let studentsEmail = await Student.aggregate([
      {
        $group: {
          _id: "$email", // Group by the email key
          name: { $first: "$name" },
        },
      },
      {
        $project: {
          email: "$_id", // Include the grouped email
          name: 1, // Include the name
          _id: 0, // Exclude the default `_id`
        },
      },
    ]);

    studentsEmail = studentsEmail.filter(
      (student) => !student.email.includes("@arban.com")
    );
    const notice = await new Notice(req.body).save();
    res.send(notice);

    studentsEmail.map((student) => {
      infoEmailTransporter.sendMail({
        from: process.env.info_email,
        to: student.email,
        subject: notice.title,
        html: `
     <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Notice Published</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;display:flex; justify-content:center; align-items:center">
  <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f9f9f9; padding: 20px; max-width:600px;">
    <tr>
      <td align="center">
        <table cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #4caf50; padding: 20px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px;">Important Notice</h1>
            </td>
          </tr>
          <!-- Personalized Greeting -->
          <tr>
            <td style="padding: 20px; text-align: left; color: #333333;">
              <p style="margin: 0 0 10px; font-size: 16px;">Dear ${
                student.name
              },</p>
            </td>
          </tr>
          <!-- Title -->
          <tr>
            <td style="padding: 20px; text-align: left; color: #333333;">
              <h2 style="margin: 0 0 10px; font-size: 20px; color: #4caf50;">${
                notice.title
              }</h2>
            </td>
          </tr>
          <!-- Description -->
          <tr>
            <td style="padding: 0 20px 20px; text-align: left; color: #555555;">
              <p style="margin: 0; line-height: 1.6;">
                ${notice.description}
              </p>
            </td>
          </tr>
          <!-- Optional Image Section -->
          <tr>
            <td style="padding: 20px; text-align: center;">
              <!-- Replace the src with your dynamic image URL -->
              <img src=${
                notice.resourceUrl
              } alt="Notice Image" style="max-width: 100%; border-radius: 5px; display: block;" />
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #777777;">
              <p style="margin: 0;">&copy; 2001 - ${new Date().getFullYear()} Arban Public School. All rights reserved.</p>
              <p style="margin: 0;">If you have questions, <a href="mailto:contact.arbanpublicschool@gmail.com" style="color: #4caf50; text-decoration: none;">Contact Us</a>.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

        `,
      });
    });
  }
);

noticesRouter.get("/", async (req, res) => {
  let studentsEmail = await Student.aggregate([
    {
      $group: {
        _id: "$email", // Group by the email key
        name: { $first: "$name" },
      },
    },
    {
      $project: {
        email: "$_id", // Include the grouped email
        name: 1, // Include the name
        _id: 0, // Exclude the default `_id`
      },
    },
  ]);
  studentsEmail = studentsEmail
    .filter((student) => !student.email.includes("@arban.com"))
    .filter((student) => !student.email.includes("@example."));
  res.send(studentsEmail);
});

export default noticesRouter;
