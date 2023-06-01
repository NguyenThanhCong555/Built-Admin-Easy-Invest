export function numberWithCommas(x, max = 3): string {
  if (typeof x !== 'number') x = Number(x);

  // return Number(x).toLocaleString('it-IT');
  const formattedNumber = x.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: max });
  return formattedNumber;
}
