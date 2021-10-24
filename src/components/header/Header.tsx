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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Toolbar } from '@mui/material';
import {
  StyledIconWrapper,
  StyledIconsWrapper,
  StyledLogo,
  StyledIText,
} from './Header.styled';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@src/utils/axios/axios.interceptor';
import { setUserData } from '@src/store/userDataStore/userSlice';
import ShoppingCartModal from '../shoppingCartModal/ShoppingCartModal';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
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
    api
      .get('users/data')
      .then((response) => {
        dispatch(setUserData(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

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
              <StyledIconWrapper as={NavLink} to="/menu" isPointer={true}>
                <FastfoodIcon></FastfoodIcon>
                <StyledIText>Dania główne</StyledIText>
              </StyledIconWrapper>

              {userData.userName ? (
                <>
                  <StyledIconWrapper
                    onClick={() =>
                      setIsOpenShoppingCartModal(!isOpenShoppingCartModal)
                    }
                  >
                    <ShoppingCartIcon></ShoppingCartIcon>
                    <StyledIText>Koszyk</StyledIText>
                  </StyledIconWrapper>
                  <StyledIconWrapper as={NavLink} to="/user">
                    <PersonIcon></PersonIcon>
                    <StyledIText>{userData.userName}</StyledIText>
                  </StyledIconWrapper>
                  <StyledIconWrapper
                    as={NavLink}
                    to="/"
                    onClick={() => auth.signOut()}
                  >
                    <ExitToAppIcon></ExitToAppIcon>
                    <StyledIText>Wyloguj się</StyledIText>
                  </StyledIconWrapper>
                  <ShoppingCartModal isOpen={isOpenShoppingCartModal} />
                </>
              ) : (
                <>
                  <StyledIconWrapper
                    id="shoppingCartButton"
                    onMouseOver={() => setIsOpenShoppingCartModal(true)}
                    onMouseLeave={() => setIsOpenShoppingCartModal(false)}
                  >
                    <ShoppingCartIcon></ShoppingCartIcon>
                    <StyledIText>Koszyk</StyledIText>
                    <ShoppingCartModal isOpen={isOpenShoppingCartModal} />
                  </StyledIconWrapper>

                  <StyledIconWrapper
                    id="loginButton"
                    onMouseOver={() => setIsOpenLoginModal(true)}
                    onMouseLeave={() => setIsOpenLoginModal(false)}
                  >
                    <LoginIcon id="loginButton"></LoginIcon>
                    <StyledIText id="loginButton">Zaloguj się</StyledIText>
                    <LoginModal isOpen={isOpenLoginModal} />
                  </StyledIconWrapper>
                  <StyledIconWrapper
                    as={NavLink}
                    to="/register"
                    isPointer={true}
                  >
                    <Add></Add>
                    <StyledIText>Zarejestruj się</StyledIText>
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
