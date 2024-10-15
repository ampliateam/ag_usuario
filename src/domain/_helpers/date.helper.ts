import { Timestamp } from 'firebase-admin/firestore';

export const dateToTimestamp = (date: Date) => {
  return Timestamp.fromDate(date);
};

export const timestampToDate = (timestamp: Timestamp) => {
  return timestamp.toDate();
};

export const utcStringToDate = (utcString: string) => {
  return new Date(utcString);
};

export const dateToUTCString = (date: Date) => {
  return date.toUTCString();
};
