import { IconButton } from '@mui/material';
import styled from 'styled-components';

export const StyledOrderListWrapper = styled.div`
  position: absolute;
  top: 120px;
  width: 100%;
  height: auto;
  overflow: scroll;
  display: grid;
  text-align: center;
  grid-template-rows: auto;
`;

export const StyledOrderWrapper = styled.div`
  display: flex;
  height: max-content;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  padding: 5% 0 5% 15%;
  margin-bottom: 100px;
`;
export const StyledLineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledIconButton = styled(IconButton)`
  text-decoration: none;
  height: 100%;
`;
