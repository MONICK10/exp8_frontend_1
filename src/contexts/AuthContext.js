import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const login = (newToken, userRole) => {
    console.log('Setting auth state:', { newToken, userRole }); // Debug log
    if (!newToken || !userRole) {
      console.error('Invalid login data:', { newToken, userRole });
      return;
    }
    setToken(newToken);
    setRole(userRole);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', userRole);
    console.log('Auth state updated successfully'); // Debug log
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};