import React, { useEffect } from 'react';
import { useAuth } from '@src/services/hooks/useAuth';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginModal from '../loginModal/LoginModal';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Toolbar, Box } from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import {
  StyledIconWrapper,
  StyledIconsWrapper,
  StyledLogo,
  StyledIText,
} from './Header.styled';
import { Add } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ShoppingCartModal from '../shoppingCartModal/ShoppingCartModal';
import { AppState } from '@src/store';
import { UserType } from '@src/utils/models/user.model';

const Header: React.FC = () => {
  const userData = useSelector((state: AppState) => state.userData);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenShoppingCartModal, setIsOpenShoppingCartModal] = useState(false);
  const auth = useAuth();
  const handleDocumentClick = (e: any) => {
    const isClosest = e.target.closest('#loginModal');
    const targetId = e.target.id;
    if (isClosest == null && targetId.toString() !== 'loginButton') {
      setIsOpenLoginModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    setIsOpenLoginModal(false);

    return () => document.removeEventListener('click', handleDocumentClick);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ maxHeight: '60px' }}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              width: '90%',
              marginLeft: 'auto',
              marginRight: '5%',
            }}
          >
            <StyledLogo as={NavLink} to="/">
              B
            </StyledLogo>
            <StyledIconsWrapper>
              <StyledIconWrapper isCursorPointer>
                <NavLink to="/menu">
                  <FastfoodIcon></FastfoodIcon>
                  <StyledIText>Menu</StyledIText>
                </NavLink>
              </StyledIconWrapper>
              <StyledIconWrapper isCursorPointer>
                <NavLink to="/tables">
                  <EventSeatIcon></EventSeatIcon>
                  <StyledIText>Rezerwacja miejsc</StyledIText>
                </NavLink>
              </StyledIconWrapper>
              {userData.userName ? (
                <>
                  <StyledIconWrapper
                    id="shoppingCartButton"
                    onMouseOver={() => setIsOpenShoppingCartModal(true)}
                    onMouseLeave={() => setIsOpenShoppingCartModal(false)}
                    isCursorPointer
                  >
                    <NavLink to="/makeOrder">
                      <ShoppingCartIcon></ShoppingCartIcon>
                      <StyledIText>Koszyk</StyledIText>
                    </NavLink>

                    <ShoppingCartModal isOpen={isOpenShoppingCartModal} />
                  </StyledIconWrapper>
                  <StyledIconWrapper isCursorPointer={true}>
                    <NavLink to="/user">
                      <PersonIcon></PersonIcon>
                      <StyledIText>{userData.userName}</StyledIText>
                    </NavLink>
                  </StyledIconWrapper>
                  {userData.userType === UserType.ADMIN ||
                  userData.userType === UserType.PERSONEL ? (
                    <StyledIconWrapper isCursorPointer={true}>
                      <NavLink to="/admin">
                        <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
                        <StyledIText>Panel administratora</StyledIText>
                      </NavLink>
                    </StyledIconWrapper>
                  ) : (
                    ''
                  )}
                  <StyledIconWrapper
                    onClick={() => auth.signOut()}
                    isCursorPointer
                  >
                    <NavLink to="/">
                      <ExitToAppIcon></ExitToAppIcon>
                      <StyledIText>Wyloguj się</StyledIText>
                    </NavLink>
                  </StyledIconWrapper>
                </>
              ) : (
                <>
                  <StyledIconWrapper
                    isCursorPointer
                    id="shoppingCartButton"
                    onMouseOver={() => setIsOpenShoppingCartModal(true)}
                    onMouseLeave={() => setIsOpenShoppingCartModal(false)}
                  >
                    <NavLink to="/makeOrder">
                      <ShoppingCartIcon></ShoppingCartIcon>
                      <StyledIText>Koszyk</StyledIText>
                    </NavLink>

                    <ShoppingCartModal isOpen={isOpenShoppingCartModal} />
                  </StyledIconWrapper>

                  <StyledIconWrapper
                    isCursorPointer
                    id="loginButton"
                    onMouseOver={() => setIsOpenLoginModal(true)}
                    onMouseLeave={() => setIsOpenLoginModal(false)}
                  >
                    <LoginIcon id="loginButton"></LoginIcon>
                    <StyledIText id="loginButton">Logowanie</StyledIText>
                    <LoginModal isOpen={isOpenLoginModal} />
                  </StyledIconWrapper>
                  <StyledIconWrapper isCursorPointer>
                    <NavLink to="/register">
                      <Add></Add>
                      <StyledIText>Zarejestruj się</StyledIText>
                    </NavLink>
                  </StyledIconWrapper>
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
