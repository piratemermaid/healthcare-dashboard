import { differenceInYears, format } from 'date-fns';

export const getPatientAge = (dateOfBirth: string | Date): number => {
  return differenceInYears(new Date(), new Date(dateOfBirth));
};

export const formatDate = (
  date: string | Date,
  dateFormat: string = 'MM/dd/yyyy'
): string => {
  return format(new Date(date), dateFormat);
};
