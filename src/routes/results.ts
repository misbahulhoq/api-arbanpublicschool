import e from "express";
import { verifyTeacher, verifyUser } from "../middlewares/auth";
import { Num } from "../models/number";
import { consolidateNumbers, ResultData } from "../lib/utils/numberFormatter";
import { Student } from "../models/student";

const results = e.Router();

results.get("/", async (req, res) => {
  const query = req.query;
  const numbers = await Num.find(query);
  const formattedNums = consolidateNumbers(numbers as unknown as ResultData[]);
});

export default results;
