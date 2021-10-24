import { api } from '@src/utils/axios/axios.interceptor';
import { useState, createContext } from 'react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { setUserData } from '@src/store/userDataStore/userSlice';
import { ElevatorSharp } from '@mui/icons-material';
const path = '/users';

interface context {
  loginError?: { message: string } | null;
  signIn: (login: string, password: string) => void;
  signOut: () => void;
}
const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState<string | null | undefined>(null);
  const signIn = async (userUsername: string, userPassword: string) => {
    try {
      const response: any = await api.post(`${path}/login`, {
        userUsername,
        userPassword,
      });
      setLoginError('Błąd połączenia z serwerem');
      const userData = response.data;
      if (userData) {
        setLoginError(null);
        dispatch(setUserData(userData));
      }
    } catch (err: any) {
      console.log('catcj');
      setLoginError('Błąd połączenia z serwerem');
      if (err.message) {
        setLoginError(err.message);
      }
    }
  };
  const signOut = async () => {
    dispatch(setUserData(null));
    try {
      const response = await api.post(`${path}/logout`);
      if (response.status === 200) {
        return <Redirect to="/" />;
      }
    } catch (err: any) {
      if (err.message) {
        setLoginError(err.message);
      }
      setLoginError('Błąd połączenia z serwerem');
    }
  };

  return (
    <AuthContext.Provider value={{ loginError, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext) as context;
  if (!auth) {
    throw Error('useAuth need to be used inside AuthContext');
  }
  return auth;
};
