import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Config } from '../config/Config';

// Typen für Context-Werte
interface AuthContextType {
  token: string | null;
  username: string | null;
  login: (newToken: string, username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Typ für den Provider
interface AuthProviderProps {
  children: ReactNode;
}

// Context erstellen (mit Defaultwerten, damit TypeScript glücklich ist)
const AuthContext = createContext<AuthContextType>({
  token: null,
  username: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Provider-Komponente
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('username'));

  // Token speichern/entfernen bei Änderung
  useEffect(() => {
    if (token) {
      localStorage.setItem(Config.localStorageKeyToken, token);
    } else {
      localStorage.removeItem(Config.localStorageKeyToken);
    }
  }, [token]);

  const login = (newToken: string, username: string) => {
    setToken(newToken);
    setUsername(username);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
  };

  const value: AuthContextType = {
    token,
    username,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook
export const useAuth = (): AuthContextType => useContext(AuthContext);
