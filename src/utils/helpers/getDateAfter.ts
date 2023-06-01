export function getDateAfter(date: Date, type: number, time: number) {
  // 0 is day, 1 is month
  if (type === 0) {
    date.setDate(date.getDate() + time);
    return date;
  } else {
    date.setMonth(date.getMonth() + time);
    return date;
  }
}
