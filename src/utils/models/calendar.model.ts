export interface CalendarModel {
  id: number;
  calendarStartDate: Date;
  calendarEndDate: Date;
  calendarTableId: string;
  calendarUserId: string;
  calendarIsConfirmed: boolean;
}
export enum PolishCalendar {
  id = 'Id',
  calendarStartDate = 'Początek wizyty',
  calendarEndDate = 'Koniec wizyty',
  calendarIsConfirmed = 'Zarezerwowane',
}
