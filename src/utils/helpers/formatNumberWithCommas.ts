export function numberWithCommas(x): string {
  if (typeof x !== 'number') x = Number(x);

  return Number(x).toLocaleString('it-IT');
}
