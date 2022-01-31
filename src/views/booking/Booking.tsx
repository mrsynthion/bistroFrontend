import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '@utils/axios/axios.interceptor';
import GenericTable, {
  GenericTableColumns,
  GenericTableRows,
} from '@src/components/table/Table';
import {
  TranslateObjectColumns,
  TranslateObjectRows,
} from '@src/utils/genericTableObjectFunc/GenericTableObjectFunc';
import { format } from 'date-fns';

enum Columns {
  id = 'id',
  calendarStartDate = 'POCZĄTEK WIZYTY',
  calendarEndDate = 'Koniec wizyty',
  userName = 'imię',
  userLastName = 'nazwisko',
  userPhone = 'numer telefonu',
  userLogin = 'login',
}
const StyledWrapper = styled.div`
  height: calc(100% - 120px);
  margin-top: 100px;
`;
interface Props {}
const Booking: React.FC<Props> = ({}) => {
  const params = useParams();
  const [rows, setRows] = useState<GenericTableRows[]>([]);
  const [columns, setColumns] = useState<GenericTableColumns[]>([]);

  useEffect(() => {
    api
      .get(`/calendar/${new Date(Date.now())}/${params.id}`)
      .then((res) => {
        const newCalendarArray = res.data.map(
          (
            {
              id,
              calendarStartDate,
              calendarEndDate,

              user,
            }: any,
            index: number
          ) => {
            const newCalendarStartDate = new Date(calendarStartDate);
            const newCalendarEndDate = new Date(calendarEndDate);
            return {
              id: index,
              calendarStartDate: format(
                newCalendarStartDate,
                'dd/MM/yyyy HH:00'
              ),
              calendarEndDate: format(newCalendarEndDate, 'dd/MM/yyyy HH:00'),

              userName: user.userName,
              userLastName: user.userLastName,
              userPhone: user.userPhoneNumber,
              userLogin: user.userUsername,
            };
          }
        );
        setRows(TranslateObjectRows(newCalendarArray));
        setColumns(TranslateObjectColumns(Columns));
        console.log(res.data);
      })
      .catch(console.log);
  }, []);
  return (
    <StyledWrapper>
      <GenericTable tableRows={rows} columns={columns} />
    </StyledWrapper>
  );
};

export default Booking;
