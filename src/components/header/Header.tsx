import React, { useEffect } from 'react';
import { useAuth } from '@src/services/hooks/useAuth';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginModal from '../loginModal/LoginModal';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { AppBar, Toolbar } from '@mui/material';

import {
  StyledIconWrapper,
  StyledIconsWrapper,
  StyledLogo,
  StyledIText,
} from './Header.styled';
import { Add } from '@mui/icons-material';

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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ maxHeight: '60px' }}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              width: '90%',
              marginLeft: 'auto',
              marginRight: '5%',
            }}
          >
            <StyledLogo as={NavLink} exact to="/">
              B
            </StyledLogo>
            <StyledIconsWrapper>
              <StyledIconWrapper as={NavLink} to="/menu">
                <FastfoodIcon></FastfoodIcon>
                <StyledIText>Dania główne</StyledIText>
              </StyledIconWrapper>
              <StyledIconWrapper as={NavLink} to="/additives">
                <EmojiFoodBeverageIcon></EmojiFoodBeverageIcon>
                <StyledIText>Dodatki</StyledIText>
              </StyledIconWrapper>
              {localStorage.getItem('userName') ? (
                <>
                  <StyledIconWrapper>
                    <StyledIText>Koszyk</StyledIText>
                  </StyledIconWrapper>
                  <StyledIconWrapper as={NavLink} to="/user">
                    <StyledIText>{auth.userName}</StyledIText>
                  </StyledIconWrapper>
                  <StyledIconWrapper
                    as={NavLink}
                    to="/"
                    onClick={() => auth.signOut()}
                  >
                    <StyledIText>Wyloguj się</StyledIText>
                  </StyledIconWrapper>
                </>
              ) : (
                <>
                  <StyledIconWrapper>
                    <ShoppingCartIcon></ShoppingCartIcon>
                    <StyledIText>Koszyk</StyledIText>
                  </StyledIconWrapper>

                  <StyledIconWrapper
                    id="loginButton"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <LoginIcon id="loginButton"></LoginIcon>
                    <StyledIText id="loginButton">Zaloguj się</StyledIText>
                  </StyledIconWrapper>
                  <StyledIconWrapper as={NavLink} to="/register">
                    <Add></Add>
                    <StyledIText>Zarejestruj się</StyledIText>
                  </StyledIconWrapper>

                  <LoginModal
                    isOpen={isOpen}
                    error={auth.loginError ? auth.loginError : null}
                  />
                </>
              )}
            </StyledIconsWrapper>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
