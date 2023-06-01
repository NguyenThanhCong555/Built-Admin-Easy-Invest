import { SECONDS_PER_DAY } from 'constants/common';

const WEEK_BY = 7;
const MONTH_BY = 30;
const YEARS_BY = 365;

export const convertSeconds = seconds => {
  return seconds / SECONDS_PER_DAY;
};

export const convertDayToSeconds = day => {
  return day * SECONDS_PER_DAY;
};

export const convertDay = day => {
  if (day % YEARS_BY === 0) {
    const yearn = day / YEARS_BY;

    if (yearn > 1) return yearn + ' ' + 'years';
    else return yearn + ' ' + 'year';
  } else if (day % MONTH_BY === 0) {
    const month = day / MONTH_BY;

    if (month > 1) return month + ' ' + 'months';
    else return month + ' ' + 'month';
  } else if (day % WEEK_BY === 0) {
    const week = day / WEEK_BY;

    if (week > 1) return week + ' ' + 'weeks';
    else return week + ' ' + 'week';
  }

  return '';
};

export const convertDayAndCheck = (day: any, input: any) => {
  if (day % YEARS_BY === 0) {
    const yearn = day / YEARS_BY;

    if (yearn > 1) {
      input(yearn);
      return 'years';
    } else {
      input(yearn);
      return 'year';
    }
  } else if (day % MONTH_BY === 0) {
    const month = day / MONTH_BY;

    if (month > 1) {
      input(month);
      return 'months';
    } else {
      input(month);
      return 'month';
    }
  } else if (day % WEEK_BY === 0) {
    const week = day / WEEK_BY;

    if (week > 1) {
      input(week);
      return 'weeks';
    } else {
      input(week);
      return 'week';
    }
  }

  return '';
};
