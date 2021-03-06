import { AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import {
  StyledIconsWrapper,
  StyledIconWrapper,
  StyledIText,
} from '@src/components/header/Header.styled';
import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { StyledAdminPanelWrapper } from './AdminPanel.styled';
import GroupIcon from '@mui/icons-material/Group';
import ReorderIcon from '@mui/icons-material/Reorder';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  margin-top: 10%;
  text-align: center;
`;
const AdminPanel: React.FC = () => {
  const location = useLocation();

  return (
    <StyledAdminPanelWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            maxHeight: '60px',
            top: '60px',
            backgroundColor: '#ffb74d',
            zIndex: '99',
          }}
        >
          <Toolbar
            sx={{
              width: '90%',
              marginLeft: 'auto',
              marginRight: '5%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <StyledIconsWrapper>
              <StyledIconWrapper isCursorPointer>
                <NavLink to="/admin/users">
                  <GroupIcon />
                  <StyledIText>Lista użytkowników</StyledIText>
                </NavLink>
              </StyledIconWrapper>
              <StyledIconWrapper isCursorPointer>
                <NavLink to="/admin/orders">
                  <ReorderIcon />
                  <StyledIText>Obsługa zamówień</StyledIText>
                </NavLink>
              </StyledIconWrapper>
              <StyledIconWrapper isCursorPointer>
                <NavLink to="/admin/booking">
                  <TableRestaurantIcon />
                  <StyledIText>Rezerwacje miejsc</StyledIText>
                </NavLink>
              </StyledIconWrapper>
            </StyledIconsWrapper>
          </Toolbar>
        </AppBar>
      </Box>
      {location.pathname === '/admin' ? (
        <StyledH1>Panel administratora</StyledH1>
      ) : (
        ''
      )}

      <Outlet></Outlet>
    </StyledAdminPanelWrapper>
  );
};

export default AdminPanel;
