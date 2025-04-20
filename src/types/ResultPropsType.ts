export interface ResultPropsType {
  uid: string;
  tableData?: {
    subject: string;
    marks1: number;
    marks2: number;
    marks3: number;
    marks4: number;
    marks5: number;
    marks6: number;
    totalMarks: number;
    average: number;
    GPA: number;
    fullMarks: number | undefined;
  }[];
  totalAverageMarks: number;
  totalGPA: number;
  averageGPA: number;
  level: string;
  position: string;
}
