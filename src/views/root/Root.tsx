import React from 'react';

import { StyledContainer, StyledWrapper } from './Root.styled';

const Root: React.FC = () => {
  return (
    <StyledWrapper>
      <h1>Strona główna</h1>
      <StyledContainer>
        <div>
          <h2>Polecamy!</h2>
        </div>
        <div>
          <h2>Danie dnia!</h2>
        </div>
        <div>
          <h2>Promocje!</h2>
        </div>
      </StyledContainer>
    </StyledWrapper>
  );
};
export default Root;
