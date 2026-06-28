import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { login as loginApi } from '../features/auth/auth.api';
import type { AuthResponse } from '../features/auth/auth.api';

interface AuthContextType {
  user: AuthResponse['user'] | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getInitialAuth(): { token: string | null; user: AuthResponse['user'] | null } {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (token && user) {
    return { token, user: JSON.parse(user) };
  }
  return { token: null, user: null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = getInitialAuth();
  const [user, setUser] = useState<AuthResponse['user'] | null>(initial.user);
  const [token, setToken] = useState<string | null>(initial.token);

  const login = async (email: string, password: string) => {
    const data = await loginApi(email, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
