import { addMinutes as fnsAddMinutes, isAfter as fnsIsAfter } from 'date-fns';

export const addMinutes = (date: Date, amount: number) =>
  fnsAddMinutes(date, amount);

export const isAfter = (firstDate: Date | number, nextDate: Date | number) =>
  fnsIsAfter(firstDate, nextDate);
