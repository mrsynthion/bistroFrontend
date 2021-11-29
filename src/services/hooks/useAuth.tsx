import api from '@src/utils/axios/axios.interceptor';
import { useState, createContext } from 'react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { setUserData } from '@src/store/userDataStore/userSlice';
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
      const userData = response.data;
      if (userData) {
        dispatch(setUserData(userData));
      }
    } catch (catchError: any) {}
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
