import { IconButton } from '@mui/material';
import styled from 'styled-components';

export const StyledShoppingCartModalWrapper = styled.div<{ isOpen: boolean }>`
  width: min(500%, 500px);
  height: 300px;
  background-color: #eeca00;
  z-index: 9999;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: absolute;
  top: 85%;
  border-radius: 50px;
  -webkit-box-shadow: 0px 12px 35px 3px rgba(96, 61, 0, 1);
  -moz-box-shadow: 0px 12px 35px 3px rgba(96, 61, 0, 1);
  box-shadow: 0px 5px 20px 3px rgba(96, 61, 0, 1);
  overflow: scroll;
  cursor: default;
  margin-top: 10px;
`;

export const StyledShoppingCartParagraph = styled.p`
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
`;
export const StyledIconWrapper = styled(IconButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.54);
  text-decoration: none;
  text-align: center;
  svg {
    font-size: 2rem;
    text-decoration: none;
  }
`;
