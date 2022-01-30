import { TablesModel } from '@src/utils/models/tables.model';
import React, { useEffect, useState } from 'react';
import api from '@utils/axios/axios.interceptor';
import styled from 'styled-components';

const StyledWrapper = styled.div<{ tables: number }>`
  height: calc(100vh - 120px);
  display: grid;
  grid-template-columns: ${({ tables }) =>
    `repeat(${Math.round(tables / 2)},calc(100% / ${Math.round(tables / 2)}))`};
  grid-template-rows: 50% 50%;
`;
interface Props {}
const TablesView: React.FC<Props> = () => {
  const [tables, setTables] = useState<TablesModel[]>([]);

  useEffect(() => {
    api
      .get('/tables')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledWrapper tables={5}>
      <h1>Siema</h1>
      <h1>Siema</h1>
      <h1>Siema</h1>
      <h1>Siema</h1>
      <h1>Siema</h1>
    </StyledWrapper>
  );
};
export default TablesView;
