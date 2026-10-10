export interface EventItem {
  allDay: boolean;
  date: Date;
  description: string;
  id: string;
  location: string;
  time: string;
  title: string;
}

export interface MonthGridCell {
  date: Date;
  inMonth: boolean;
}