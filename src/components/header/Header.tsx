import { useAuth } from '@src/services/hooks/useAuth';
import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  HeaderWrapper,
  StyledI,
  StyledIconsWrapper,
  StyledLogo,
  StyledIText,
  StyledWrapper,
} from './Header.styled';

const Header: React.FC = () => {
  const auth = useAuth();
  return (
    <HeaderWrapper>
      <StyledWrapper>
        <StyledLogo as={NavLink} exact to="/">
          B
        </StyledLogo>

        {auth.user ? (
          <StyledIconsWrapper>
            <StyledI className="pi pi-shopping-cart">
              <StyledIText>Koszyk</StyledIText>
            </StyledI>
            <StyledI as={NavLink} to="/user" className="pi pi-user">
              <StyledIText>{auth.user.userUserName}</StyledIText>
            </StyledI>
            <StyledI
              as={NavLink}
              to="/"
              onClick={() => auth.signOut()}
              className="pi pi-sign-out"
            >
              <StyledIText>Wyloguj się</StyledIText>
            </StyledI>
          </StyledIconsWrapper>
        ) : (
          <StyledIconsWrapper>
            <StyledI className="pi pi-shopping-cart">
              <StyledIText>Koszyk</StyledIText>
            </StyledI>
            <StyledI className="pi pi-sign-in">
              <StyledIText>Zaloguj się</StyledIText>
            </StyledI>
          </StyledIconsWrapper>
        )}
      </StyledWrapper>
    </HeaderWrapper>
  );
};

export default Header;
