import type { MonthGridCell } from "./types";

export const addDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const sameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const formatEventDate = (date: Date): string =>
  date.toLocaleDateString("sv-SE", { day: "numeric", month: "short" });

export const formatEventTime = (date: Date): string =>
  date.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });

// Builds a 7-wide grid of cells (with leading/trailing days from
// neighbouring months) for a given year/month. Monday-first week.
export const getMonthGrid = (year: number, month: number): MonthGridCell[] => {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // Mon = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: MonthGridCell[] = [];
  for (let i = startOffset; i > 0; i--) {
    const date = new Date(year, month, 1 - i);
    cells.push({ date, inMonth: false });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: new Date(year, month, day), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: addDays(last, 1), inMonth: false });
  }
  return cells;
};