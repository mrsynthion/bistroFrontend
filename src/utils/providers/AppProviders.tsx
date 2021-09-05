import { ThemeProvider } from 'styled-components';
import React from 'react';
import { theme } from '@theme/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from '@src/globalStyle';
import { AuthProvider } from '@src/services/hooks/useAuth';

const AppProviders: React.FC = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <GlobalStyle />
          <Router>{children}</Router>
        </AuthProvider>
      </ThemeProvider>
      \
    </>
  );
};
export default AppProviders;
