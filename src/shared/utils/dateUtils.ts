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
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear());

  return format.replace('DD', day).replace('MM', month).replace('YYYY', year);
};

/**
 * Format a Date object to 'YYYY-MM-DD' string for Backend DateOnly fields
 * but keep the TypeScript type as `Date` to prevent type errors in payload interfaces.
 *
 * @param date - Date object or string
 * @returns Formatted string disguised as a Date object for TS
 */
export function toDateOnly(date: Date | string | null | undefined): Date {
  if (!date) return date as unknown as Date;
  const d = new Date(date);
  if (isNaN(d.getTime())) return date as unknown as Date;

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear());

  return `${year}-${month}-${day}` as unknown as Date;
}

export function formatDatesInPayload<T>(payload: T): T {
  if (!payload || typeof payload !== 'object') return payload;

  if (payload instanceof Date) {
    return toDateOnly(payload) as unknown as T;
  }

  if (Array.isArray(payload)) {
    return payload.map(item => formatDatesInPayload(item)) as unknown as T;
  }

  const newPayload = { ...payload } as Record<string, unknown>;
  for (const key in newPayload) {
    if (Object.prototype.hasOwnProperty.call(newPayload, key)) {
      const value = newPayload[key];
      if (value instanceof Date) {
        newPayload[key] = toDateOnly(value);
      } else if (typeof value === 'object' && value !== null) {
        newPayload[key] = formatDatesInPayload(value);
      }
    }
  }

  return newPayload as unknown as T;
}
