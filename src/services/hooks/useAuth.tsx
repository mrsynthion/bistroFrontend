import { api } from '@src/utils/axios/axios.interceptor';
import { User } from '@src/utils/models/user.model';
import React, { useState, useEffect, createContext } from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router';
const path = '/users';

interface context {
  user: User | null;
  signIn: (login: string, password: string) => void;
  signOut: () => void;
}
const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const signIn = async (login: string, password: string) => {
    try {
      const response: User = await api.post(`${path}/login`, {
        login,
        password,
      });
      setUser(response);
    } catch (e) {
      console.log('Niepoprawne dane logowania', e);
    }
  };
  const signOut = async () => {
    try {
      const response = await api.post(`${path}/logout`);
      if (response.status === 200) {
        setUser(null);
        return <Redirect to="/" />;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
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
