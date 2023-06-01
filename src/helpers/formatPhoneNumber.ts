export const formatPhoneNumber = (input: string): string => {
  return input.replace(/(\d{2})(\d{3})(\d{3})(\d{4}|(\d{3}))/, '+$1 $2-$3-$4');
};
export const formatUS = (value: any) => {
  if (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
};

export const formatMilliSeconds = (ms: number, isHour: boolean) => {
  const date = new Date(ms);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  if (isHour) {
    return hours + ':' + minutes + ' ' + day + '/' + month + '/' + year;
  } else {
    return day + '/' + month + '/' + year;
  }
};
