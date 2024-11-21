import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToLocaleDateTime(isoDateTimeString: Date) {
  const date = new Date(isoDateTimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}

export function formatDate(dateInput: string) {
  const date = new Date(dateInput);
  let month = '' + (date.getMonth() + 1), // getMonth() is zero-based
    day = '' + date.getDate(),
    year = date.getFullYear();

  // Pad single digit month and day with a leading zero
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

export function extractDateOnly(timestamp: string | Date): string {
  // Ensure we're working with a Date object
  const date = timestamp instanceof Date
    ? timestamp
    : new Date(timestamp);

  // Adjust to local midnight to prevent timezone shifts
  const localDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // Format in YYYY-MM-DD
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}