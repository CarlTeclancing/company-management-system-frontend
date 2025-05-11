import React, { useState, useEffect, useContext, createContext } from 'react';

export const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Restore user from localStorage when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user'); // remove invalid data
      }
    }
  }, []);

  // Store user in localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
