import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import api from '@utils/axios/axios.interceptor';
import DatePicker from '@mui/lab/DatePicker';
import { IconButton, TextField } from '@mui/material';
import {
  CalendarModel,
  PolishCalendar,
} from '@src/utils/models/calendar.model';
import styled from 'styled-components';
import GenericTable, {
  GenericTableColumns,
  GenericTableRows,
} from '@src/components/table/Table';
import {
  TranslateObjectColumns,
  TranslateObjectRows,
} from '@src/utils/genericTableObjectFunc/GenericTableObjectFunc';
import { ScheduleModel } from '@src/utils/models/schedule.model';
import { useSelector } from 'react-redux';
import { AppState } from '@src/store';

enum WeekDays {
  Monday = 'Poniedziałek',
  Tuesday = 'Wtorek',
  Wednesday = 'Środa',
  Thursday = 'Czwartek',
  Friday = 'Piątek',
  Saturday = 'Sobota',
  Sunday = 'Niedziela',
}
enum Months {
  January = 'Styczeń',
  February = 'Luty',
  March = 'Marzec',
  April = 'Kwiecień',
  May = 'Maj',
  June = 'Czerwiec',
  July = 'Lipiec',
  August = 'Sierpień',
  September = 'Wrzesień',
  October = 'Październik',
  November = 'Listopad',
  December = 'Grudzień',
}
interface Props {}
const StyledIconButton = styled(IconButton)`
  font-size: 1rem !important;
`;
const StyledWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  display: grid;
  grid-template-columns: 30% 1fr;
`;
const StyledCalendarWrapper = styled.div`
  width: 100%;
  height: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  div {
    width: 80%;
    margin: 0 auto;
    label {
      left: 10%;
    }
  }
  h3 {
    margin: 10% auto auto;
  }
`;
const StyledTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 10% auto auto auto;
  h3 {
    margin: 10% auto auto;
    text-align: center;
  }
`;
function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
const RestaurantTableView: React.FC<Props> = ({}) => {
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [calendar, setCalendar] = useState<CalendarModel[]>([]);
  const [currentCalendar, setCurrentCalendar] = useState<CalendarModel[]>([]);
  const [schedule, setSchedule] = useState<ScheduleModel[]>([]);
  const [rows, setRows] = useState<GenericTableRows[]>([]);
  const [columns, setColumns] = useState<GenericTableColumns[]>([]);
  const [booked, setBooked] = useState<CalendarModel | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const user = useSelector((state: AppState) => state.userData);
  const params = useParams();

  useEffect(() => {
    setReload(true);
  }, []);

  useEffect(() => {
    if (reload) {
      api
        .get<CalendarModel[]>(`calendar/${params.id}`)
        .then((res) => {
          setCalendar(res.data);
        })
        .catch(console.log);
      api
        .get<ScheduleModel[]>('schedule')
        .then((res) => {
          setSchedule(res.data);
        })
        .catch(console.log);
      setReload(false);
    }
  }, [reload]);
  useEffect(() => {
    if (date instanceof Date) {
      const currentSchedule = calendar.filter((cal) => {
        return sameDay(new Date(cal.calendarStartDate), new Date(date));
      });

      setCurrentCalendar(currentSchedule);
      const columns = { ...PolishCalendar, book: 'Zarezerwuj' };
      setColumns(TranslateObjectColumns(columns));
    }
  }, [calendar, date]);

  useEffect(() => {
    const day = date.getDay();
    let newRows: any = [];
    schedule.forEach((sch) => {
      if (parseInt(sch.scheduleWeekDay) === day) {
        const minHour = parseInt(sch.scheduleOpeningHour);
        const maxHour = parseInt(sch.scheduleCloseHour);
        for (let i = minHour; i < maxHour; i++) {
          const confirmed = currentCalendar?.find((curr) => {
            const currDate = new Date(curr.calendarStartDate);
            if (sameDay(currDate, date) && currDate.getHours() - 1 === i) {
              return currDate;
            }
          });
          if (confirmed) {
            console.log(i, confirmed.calendarIsConfirmed);
            newRows.push({
              id: null,
              calendarStartDate: `${i}:00`,
              calendarEndDate: `${i + 1}:00`,
              calendarIsConfirmed: confirmed.calendarIsConfirmed,
              book: ' - ',
            });
          } else {
            const calendarStartDate = new Date(date.setHours(i));
            const calendarEndDate = new Date(date.setHours(i + 1));

            newRows.push({
              id: null,
              calendarStartDate: `${i}:00`,
              calendarEndDate: `${i + 1}:00`,
              calendarIsConfirmed: false,
              book:
                user && user.id ? (
                  <StyledIconButton
                    onClick={() =>
                      setBooked({
                        id: 0,
                        calendarStartDate,
                        calendarEndDate,
                        calendarIsConfirmed: true,
                        calendarTableId:
                          params && params.id ? params.id.toString() : '0',
                        calendarUserId: user.id.toString(),
                      })
                    }
                  >
                    Zarezerwuj
                  </StyledIconButton>
                ) : (
                  'Wymaga zalogowania'
                ),
            });
          }
        }
      }
    });

    setRows(TranslateObjectRows(newRows));
  }, [currentCalendar]);

  useEffect(() => {
    if (booked) {
      const newCalendar: CalendarModel = booked;
      api
        .post('/calendar/addCalendar', newCalendar)
        .then((res) => {
          setReload(true);
          console.log(res.data);
        })
        .catch(console.log);
    }
  }, [booked]);
  return (
    <StyledWrapper>
      <StyledCalendarWrapper>
        <DatePicker
          renderInput={(props) => <TextField {...props} />}
          label="Wybierz dzień"
          value={date}
          showTodayButton
          onChange={(newValue) => {
            if (newValue instanceof Date) {
              setDate(newValue);
            }
          }}
        />
        <h3>
          {Object.values(WeekDays)[date.getDay() - 1] +
            ', ' +
            date.getDate() +
            ' ' +
            Object.values(Months)[date.getMonth()] +
            ' ' +
            date.getFullYear()}
        </h3>
      </StyledCalendarWrapper>

      <StyledTableWrapper>
        <GenericTable columns={columns} tableRows={rows}></GenericTable>
        {rows.length !== 0 ? '' : <h3>W weekend zamknięte</h3>}
      </StyledTableWrapper>
    </StyledWrapper>
  );
};
export default RestaurantTableView;
