import { api } from '@src/utils/axios/axios.interceptor';
import { useState, createContext } from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router';
const path = '/users';

interface context {
  userName: string | null;
  signIn: (login: string, password: string) => void;
  signOut: () => void;
}
const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [userName, setUserName] = useState(null);
  const signIn = async (userUsername: string, userPassword: string) => {
    try {
      const response: any = await api.post(`${path}/login`, {
        userUsername,
        userPassword,
      });
      const userName = response.data;
      if (userName) {
        setUserName(userName);
        window.localStorage.setItem('userName', JSON.stringify(userName));
      }
    } catch (e) {
      console.log('Niepoprawne dane logowania', e);
    }
  };
  const signOut = async () => {
    try {
      const response = await api.post(`${path}/logout`);
      if (response.status === 200) {
        window.localStorage.removeItem('userName');
        setUserName(null);
        return <Redirect to="/" />;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ userName, signIn, signOut }}>
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
