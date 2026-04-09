import moment from 'moment';

/**
 * Formats a date string into a specified format.
 * Defaults to 'DD-MM-YYYY'.
 * Returns '-' if the date is null, undefined, or invalid.
 */
export const formatDate = (
  date: string | Date | null | undefined,
  format: string = 'DD-MM-YYYY'
): string => {
  if (!date) return '-';
  const m = moment(date);
  return m.isValid() ? m.format(format) : '-';
};
