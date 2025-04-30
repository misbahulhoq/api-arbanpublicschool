export function convertDateToString(dateStr: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  try {
    const [day, month, year] = dateStr.split("/");
    const fullYear = `20${year}`; // Assuming 21st century
    return `${months[Number(month) - 1]} ${day}, ${fullYear}`;
  } catch (error) {
    return "Invalid date format";
  }
}
