import { differenceInYears, format, isValid } from 'date-fns';

export const getPatientAge = (dateOfBirth: string | Date): number => {
  return differenceInYears(new Date(), new Date(dateOfBirth));
};

export const formatDate = (
  dateString: string | Date,
  dateFormat: string = 'MM/dd/yyyy'
): string => {
  const date = new Date(dateString);

  if (!isValid(date)) {
    return 'N/A';
  }

  return format(date, dateFormat);
};
