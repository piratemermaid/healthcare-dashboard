import { format, isValid } from 'date-fns';

export const formatDate = (
  dateString: string | Date | null,
  dateFormat: string = 'MM/dd/yyyy'
): string => {
  if (!dateString) {
    return 'N/A';
  }

  const date = new Date(dateString);

  if (!isValid(date)) {
    return 'N/A';
  }

  return format(date, dateFormat);
};
