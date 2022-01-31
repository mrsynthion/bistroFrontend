import { ThemeProvider } from 'styled-components';
import React from 'react';
import { theme } from '@theme/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from '@src/globalStyle';
import { AuthProvider } from '@src/services/hooks/useAuth';
import { Provider } from 'react-redux';
import { store } from '@src/store';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#cc7807',
    },
    secondary: {
      main: '#1976D2',
    },
  },
};

const muiTheme = createTheme(themeOptions);
const AppProviders: React.FC = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <GlobalStyle />
            <MuiThemeProvider theme={muiTheme}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Router>{children}</Router>
              </LocalizationProvider>
            </MuiThemeProvider>
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};
export default AppProviders;
