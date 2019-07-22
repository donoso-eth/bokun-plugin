import { DateYMD, Time } from '../models/bokun-types';

export function pad(n) {
  return n < 10 ? '0' + n : n;
}

export const dateYMDtoDate = (date: DateYMD): Date => {
  return new Date(Date.UTC(date.year, date.month - 1, date.day));
};

export const dateYMDtoInitMonthDate = (date: DateYMD): Date => {
  return new Date(Date.UTC(date.year, date.month - 1, 1));
};

export const datetoDateYMD = (date: Date): DateYMD => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
};

export const dateYMDtoSTRING = (date: DateYMD): string => {
  return pad(date.day) + '-' + pad(date.month) + '-' + date.year;
};

export const dateStringtoDATE = (stringDate: string): Date => {
  const myDateSplit = stringDate.split('-');
  return new Date(Date.UTC(+myDateSplit[2], +myDateSplit[1] - 1, 1));
};

export const dateStringtoYMD = (stringDate: string): DateYMD => {
  const myDateSplit = stringDate.split('-');
  return {
    year: +myDateSplit[2],
    month: +myDateSplit[1],
    day: +myDateSplit[0]
  };
};

export const timeStringtoYMD = (stringHour: string): Time => {
  const myTimeSplit = stringHour.split(':');
  return { hour: +myTimeSplit[0], minute: +myTimeSplit[1] };
};

export const createMonthDaysArray = (
  from: DateYMD,
  to: DateYMD
): Array<string> => {
  const startDate = dateYMDtoDate(from);
  const endDate = dateYMDtoDate(to);

  let i = 0;
  const monthDays = [];
  while (startDate.getTime() + i * (24 * 60 * 60 * 1000) <= endDate.getTime()) {
    const myNewDay = new Date(startDate.getTime() + i * (24 * 60 * 60 * 1000));
    const myNewDayYMD = datetoDateYMD(myNewDay);
    const mySearchDay = dateYMDtoSTRING(myNewDayYMD);
    monthDays.push(mySearchDay);
    i++;
  }
  return monthDays;
};
