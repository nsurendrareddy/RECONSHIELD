'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('user');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role') || 'user';
    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole);
      setUser({ role: savedRole });
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setUser({ role });
    } else if (token === null && user !== null) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setUser(null);
    }
  }, [token, role]);

  const login = (tokenData, roleData) => {
    setToken(tokenData);
    setRole(roleData);
    setUser({ role: roleData });
  };

  const logout = () => {
    setToken(null);
    setRole('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
