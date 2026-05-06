import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || 'user');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      // Optional: Fetch user profile here to verify token validity
      setUser({ role });
    } else {
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
