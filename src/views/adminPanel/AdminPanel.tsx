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
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  margin-top: 10%;
  text-align: center;
`;
const AdminPanel: React.FC = () => {
  const location = useLocation();
  console.log(location);
  return (
    <StyledAdminPanelWrapper>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ maxHeight: '60px', top: '60px', backgroundColor: '#ffb74d' }}
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
              <StyledIconWrapper as={NavLink} to="/admin/users">
                <GroupIcon />
                <StyledIText>Lista użytkowników</StyledIText>
              </StyledIconWrapper>
              <StyledIconWrapper as={NavLink} to="/admin/orders">
                <ReorderIcon />
                <StyledIText>Obsługa zamówień</StyledIText>
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
