import { TablesModel } from '@src/utils/models/tables.model';
import React, { useEffect, useState } from 'react';
import api from '@utils/axios/axios.interceptor';
import styled from 'styled-components';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';

const StyledWrapper = styled.div<{ tables: number }>`
  height: calc(100vh - 120px);
  display: grid;
  grid-template-columns: ${({ tables }) =>
    `repeat(${Math.round(tables / 2)},calc(100% / ${Math.round(tables / 2)}))`};
  grid-template-rows: 50% 50%;
`;
const StyledRestaurantTable = styled(IconButton)`
  width: 400px;
  height: 200px;
  margin: auto auto auto 0 !important;
  font-size: 0.5rem;
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.54);
  }
  svg {
    width: 80%;
    height: 80%;
  }
`;
interface Props {}
const TablesView: React.FC<Props> = () => {
  const [tables, setTables] = useState<TablesModel[]>([]);
  useEffect(() => {
    api
      .get<TablesModel[]>('/tables')
      .then((res) => {
        setTables(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledWrapper tables={tables.length}>
      {tables.map((table, index) => (
        <StyledRestaurantTable key={table.id}>
          <NavLink to={`${table.id}`}>
            <TableRestaurantIcon></TableRestaurantIcon>
            <h5>{`Stół nr ${++index} dla ${
              table.tableQuantityOfSeats
            } osób`}</h5>
          </NavLink>
        </StyledRestaurantTable>
      ))}
    </StyledWrapper>
  );
};
export default TablesView;
