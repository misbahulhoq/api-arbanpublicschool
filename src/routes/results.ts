import e from "express";
import { verifyTeacher, verifyUser } from "../middlewares/auth";
import { Num } from "../models/number";
import { consolidateNumbers, ResultData } from "../lib/utils/numberFormatter";
import { Student } from "../models/student";
import { ResultPropsType } from "../types/ResultPropsType";
import { positionFormatter } from "../utils/positionFormatter";

const results = e.Router();

results.get("/", async (req, res) => {
  const query = req.query;
  const numbers = await Num.find(query);
  const formattedNums = consolidateNumbers(numbers as unknown as ResultData[]);
  const resultWithAverage = formattedNums.map((props) => {
    const updatedProps: Partial<ResultPropsType> = {
      uid: props.uid,
      level: props.level,
    };
    const subjects = [
      ...new Set([
        ...props.firstTutorial.map((item) => item.name),
        ...props.firstSemester.map((item) => item.name),
        ...props.secondTutorial.map((item) => item.name),
        ...props.secondSemester.map((item) => item.name),
        ...props.thirdTutorial.map((item) => item.name),
        ...props.thirdSemester.map((item) => item.name),
      ]),
    ];
    // Prepare table data
    const tableData = subjects.map((subject) => {
      const firstTutorial = props.firstTutorial.find(
        (item) => item.name === subject
      );
      const firstSemester = props.firstSemester.find(
        (item) => item.name === subject
      );
      const secondTutorial = props.secondTutorial.find(
        (item) => item.name === subject
      );
      const secondSemester = props.secondSemester.find(
        (item) => item.name === subject
      );
      const thirdTutorial = props.thirdTutorial.find(
        (item) => item.name === subject
      );
      const thirdSemester = props.thirdSemester.find(
        (item) => item.name === subject
      );

      const marks1 = firstTutorial ? firstTutorial.obtMarks : 0;
      const marks2 = firstSemester ? firstSemester.obtMarks : 0;
      const marks3 = secondTutorial ? secondTutorial.obtMarks : 0;
      const marks4 = secondSemester ? secondSemester.obtMarks : 0;
      const marks5 = thirdTutorial ? thirdTutorial.obtMarks : 0;
      const marks6 = thirdSemester ? thirdSemester.obtMarks : 0;
      const fullMarks = firstSemester?.fullMarks;
      const totalMarks = marks1 + marks2 + marks3;
      let average: string | number = (
        (marks1 + marks2 + marks3) /
        ((firstSemester ? 1 : 0) +
          (secondSemester ? 1 : 0) +
          (thirdSemester ? 1 : 0))
      ).toFixed(2);

      average = parseFloat(average);
      const percentage = (average / (fullMarks as number)) * 100;
      let GPA: number;
      if (percentage >= 80 && percentage <= 100) GPA = 5;
      else if (percentage < 80 && percentage >= 70) GPA = 4;
      else if (percentage < 70 && percentage >= 60) GPA = 3.5;
      else if (percentage < 60 && percentage >= 50) GPA = 3;
      else if (percentage < 50 && percentage >= 40) GPA = 2;
      else if (percentage < 40 && percentage >= 33) GPA = 1;
      else GPA = 0;
      return {
        subject,
        marks1,
        marks2,
        marks3,
        marks4,
        marks5,
        marks6,
        totalMarks,
        average,
        GPA,
        fullMarks,
      };
    });
    //   calculate total marks
    const totalAverageMarks = tableData.reduce(
      (sum, av) => sum + av.average,
      0
    );
    const totalGPA = tableData.reduce((sum, av) => sum + av.GPA, 0);
    const averageGPA = tableData.every((d) => d.GPA > 0)
      ? tableData.reduce((sum, av) => sum + av.GPA, 0) / tableData.length
      : 0;

    // updatedProps.tableData = tableData;
    updatedProps.totalAverageMarks = totalAverageMarks;
    updatedProps.totalGPA = totalGPA;
    updatedProps.averageGPA = averageGPA;
    return updatedProps;
  });

  const isPrimarySchool = ["1", "2", "3", "4", "5"].includes(
    req.query.class as string
  );
  const isHighSchool = ["6", "7", "8", "9", "10"].includes(
    req.query.class as string
  );

  console.log({
    isPrimarySchool,
    isHighSchool,
  });
  // sort the array according to totalAverageMarks if primary school
  if (isPrimarySchool) {
    resultWithAverage.sort(
      (a: any, b: any) => b.totalAverageMarks - a.totalAverageMarks
    );
  }
  // sort the array according to averageGPA if high school
  if (isHighSchool) {
    resultWithAverage.sort((a: any, b: any) => b.averageGPA - a.averageGPA);
  }

  const resultWithPosition = resultWithAverage.map((item, index) => {
    const position = index + 1;
    return { ...item, position: positionFormatter(position) };
  });

  res.send(resultWithPosition);
});

export default results;
