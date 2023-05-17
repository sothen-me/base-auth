import { addMinutes as fnsAddMinutes } from 'date-fns';

export const addMinutes = (date: Date, amount: number) =>
  fnsAddMinutes(date, amount);
