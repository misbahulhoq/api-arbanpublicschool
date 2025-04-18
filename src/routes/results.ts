import e from "express";
import { verifyTeacher, verifyUser } from "../middlewares/auth";
import { Num } from "../models/number";

const results = e.Router();

results.get("/", verifyUser, verifyTeacher, async (req, res) => {
  const query = req.query;
  if (query) {
    const numbers = await Num.find(query);
    console.log(numbers);
    return res.send(numbers);
  }
  const numbers = await Num.find();
  res.send(numbers);
});

export default results;
