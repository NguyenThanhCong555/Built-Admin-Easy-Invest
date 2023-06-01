export function formatVND(data: number): string {
  if (typeof data !== 'number') data = Number(data);

  return data.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
