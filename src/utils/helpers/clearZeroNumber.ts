export function clearZeroNumber(string: string) {
  const newString = string.startsWith('0') ? string.slice(1) : string;
  return newString;
}
