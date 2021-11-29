import { PolishVariables } from '@src/utils/models/user.model';
import styled from 'styled-components';

export const StyledUserDataInputWrapper = styled.div`
  height: 100%;
  width: 100%;

  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(7, 1fr);
  grid-gap: 3%;
  padding: 10%;
`;
export const StyledUserDataInput = styled.div<{ value: string }>`
  width: 100%;
  height: 100%;
  grid-column-start: ${({ value }) =>
    value === PolishVariables.userPassword ? 1 : ''};
  grid-column-end: ${({ value }) =>
    value === PolishVariables.userPassword ? 3 : ''};
`;
interface SubmittingParagraphProps {
  error?: boolean;
  success?: boolean;
}
export const StyledUserDataSubmittingParagraph = styled.p<SubmittingParagraphProps>`
  font-size: ${({ theme }) => theme.font.size.h3};
  margin: 0 auto 15%;
  color: ${({ error, success }) => {
    if (error) {
      return '#f44336';
    }
    if (success) {
      return '#388e3c';
    }
  }};
`;
export const StyledTableWrapper = styled.div`
  margin-top: 10%;
  color: black;
`;
