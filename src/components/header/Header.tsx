import { User } from '@src/utils/models/user.model';
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

interface HeaderProps {
  user?: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <HeaderWrapper>
      <StyledWrapper>
        <StyledLogo as={NavLink} exact to="/">
          B
        </StyledLogo>

        {user ? (
          <StyledIconsWrapper>
            <StyledI className="pi pi-shopping-cart">
              <StyledIText>Koszyk</StyledIText>
            </StyledI>
            <StyledI className="pi pi-user">
              <StyledIText>{user?.userUserName}</StyledIText>
            </StyledI>
            <StyledI className="pi pi-sign-out">
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
