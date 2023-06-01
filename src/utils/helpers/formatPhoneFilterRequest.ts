export function formatPhoneFilterRequest(phone: string) {
  let value = phone;
  if (value.startsWith('0') || value.startsWith('+')) {
    value = value.substring(1);
  }
  if (value[0] === '8' && value[1] === '4') value = value;
  else value = '84' + value;

  return value;
}
