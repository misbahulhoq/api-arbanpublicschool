export interface Subject {
  name: string;
  fullMarks: number;
  obtMarks: number;
  slug: string;
  _id?: string;
}
interface ResultData {
  _id?: string;
  uid: string;
  class: string;
  exam: string;
  examCode: string;
  examYear: string;
  subjects: Subject[];
  __v?: number;
}

export function consolidateNumbers(results: ResultData[]) {
  const consolidated: {
    [key: string]: {
      uid: string;
      firstTutorial: Subject[];
      firstSemester: Subject[];
      secondTutorial: Subject[];
      secondSemester: Subject[];
      thirdTutorial: Subject[];
      thirdSemester: Subject[];
    };
  } = {};

  results?.forEach((result) => {
    const { uid, examCode, subjects, ...rest } = result;

    if (!consolidated[uid]) {
      // Initialize the consolidated object for this uid
      consolidated[uid] = {
        uid,
        ...rest,
        firstTutorial: [],
        firstSemester: [],
        secondTutorial: [],
        secondSemester: [],
        thirdTutorial: [],
        thirdSemester: [],
      };
    }

    // Add subjects to the appropriate semester based on examCode
    if (examCode === "2401") {
      consolidated[uid].firstTutorial.push(...subjects);
    } else if (examCode === "2402") {
      consolidated[uid].firstSemester.push(...subjects);
    } else if (examCode === "2403") {
      consolidated[uid].secondTutorial.push(...subjects);
    } else if (examCode === "2404") {
      consolidated[uid].secondSemester.push(...subjects);
    } else if (examCode === "2405") {
      consolidated[uid].thirdTutorial.push(...subjects);
    } else if (examCode === "2406") {
      consolidated[uid].thirdSemester.push(...subjects);
    }
  });

  // Return the consolidated objects as an array
  return Object.values(consolidated);
}
