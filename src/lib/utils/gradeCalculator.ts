export function getGradeByGP(gp: number) {
  if (gp === 5) return "A+";
  if (gp === 4) return "A";
  if (gp === 3.5) return "A-";
  if (gp === 3) return "B";
  if (gp === 2) return "C";
  if (gp === 1) return "D";
  else return "F";
}
