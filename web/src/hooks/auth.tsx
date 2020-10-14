import React, { createContext, useState, useCallback, useContext } from 'react';

import api from '../services/api';

interface UserData {
  user: object;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: object;
  token: string;
  signIn(credentials: LoginCredentials): Promise<void>;
  signOut(): void;
}

const authContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    const token = localStorage.getItem('@gofinance:token');
    const user = localStorage.getItem('@gofinance:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as UserData;
  });

  const signIn = useCallback(async ({ email, password }: LoginCredentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    localStorage.setItem('@gofinance:token', token);
    localStorage.setItem('@gofinance:user', JSON.stringify(user));

    setUserData({
      token,
      user,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@gofinance:token');
    localStorage.removeItem('@gofinance:user');

    setUserData({} as UserData);
  }, []);

  return (
    <authContext.Provider
      value={{ token: userData.token, user: userData.user, signIn, signOut }}
    >
      {children}
    </authContext.Provider>
  );
};

function useAuth(): AuthContextProps {
  const context = useContext(authContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
