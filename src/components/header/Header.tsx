import React, { useEffect } from 'react';
import { useAuth } from '@src/services/hooks/useAuth';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginModal from '../loginModal/LoginModal';

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
  const handleDocumentClick = (e: any) => {
    const isClosest = e.target.closest('#loginModal');
    const targetId = e.target.id;
    if (isClosest == null && targetId.toString() !== 'loginButton') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  useEffect(() => {
    if (auth.userName) {
      setIsOpen(false);
    }
  }, [auth]);
  return (
    <>
      <HeaderWrapper>
        <StyledWrapper>
          <StyledLogo as={NavLink} exact to="/">
            B
          </StyledLogo>

          <StyledIconsWrapper>
            <StyledI as={NavLink} to="/menu" className="pi pi-ellipsis-h">
              <StyledIText>Dania główne</StyledIText>
            </StyledI>
            <StyledI as={NavLink} to="/additives" className="pi pi-plus">
              <StyledIText>Dodatki</StyledIText>
            </StyledI>
            {auth.userName ? (
              <>
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
              </>
            ) : (
              <>
                <StyledI className="pi pi-shopping-cart">
                  <StyledIText>Koszyk</StyledIText>
                </StyledI>
                <StyledI
                  id="loginButton"
                  className="pi pi-sign-in"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <StyledIText id="loginButton">Zaloguj się</StyledIText>
                </StyledI>
                <LoginModal
                  isOpen={isOpen}
                  error={auth.loginError ? auth.loginError : null}
                />
              </>
            )}
          </StyledIconsWrapper>
        </StyledWrapper>
      </HeaderWrapper>
    </>
  );
};

export default Header;
