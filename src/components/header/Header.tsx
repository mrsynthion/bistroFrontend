import { useAuth } from '@src/services/hooks/useAuth';
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginModal from '../loginModal/LoginModal';
import Navbar from '../navbar/Navbar';

import {
  HeaderWrapper,
  StyledI,
  StyledIconsWrapper,
  StyledLogo,
  StyledIText,
  StyledWrapper,
} from './Header.styled';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();
  return (
    <>
      <HeaderWrapper>
        <StyledWrapper>
          <StyledLogo as={NavLink} exact to="/">
            B
          </StyledLogo>

          {auth.userName ? (
            <StyledIconsWrapper>
              <StyledI className="pi pi-shopping-cart">
                <StyledIText>Koszyk</StyledIText>
              </StyledI>
              <StyledI as={NavLink} to="/user" className="pi pi-user">
                <StyledIText>{auth.userName}</StyledIText>
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
              <StyledI
                className="pi pi-sign-in"
                onClick={() => setIsOpen(!isOpen)}
              >
                <StyledIText>Zaloguj się</StyledIText>
              </StyledI>
              <LoginModal isOpen={isOpen} />
            </StyledIconsWrapper>
          )}
        </StyledWrapper>
        <Navbar />
      </HeaderWrapper>
    </>
  );
};

export default Header;
