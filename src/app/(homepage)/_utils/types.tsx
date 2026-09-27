export interface EventItem {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
}

export interface MonthGridCell {
  date: Date;
  inMonth: boolean;
}