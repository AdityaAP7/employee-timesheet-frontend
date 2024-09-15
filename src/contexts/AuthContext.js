import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Add user state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optional: Verify token validity with server if needed
      setIsAuthenticated(true);
      // Optionally fetch user details from server if required
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    setUser({ firstName: userData.firstName, lastName: userData.lastName });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
