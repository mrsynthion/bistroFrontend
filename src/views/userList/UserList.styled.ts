import styled from 'styled-components';

export const StyledUserListWrapper = styled.div`
  position: absolute;
  top: 120px;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 5%;
`;

export const StyledUserRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const StyledUserColumn = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-evenly;
`;
