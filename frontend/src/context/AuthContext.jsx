import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginWithGoogle, logout as firebaseLogout, auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const token = await currentUser.getIdToken();
          localStorage.setItem('authToken', token);
          setUser(currentUser);
        } else {
          localStorage.removeItem('authToken');
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // If no auth initialized, we aren't loading real auth state
      setLoading(false);
      // Check if we have a mock token
      if (localStorage.getItem('authToken') === 'mock') {
         setUser({ displayName: 'Guest User' });
      }
    }
  }, []);

  const login = async () => {
    try {
      const { user, token } = await loginWithGoogle();
      localStorage.setItem('authToken', token);
      setUser(user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const loginAsGuest = () => {
    // Generate a pseudo-token for the guest session that the backend auth middleware will bypass
    const guestToken = 'mock'; 
    localStorage.setItem('authToken', guestToken);
    setUser({ displayName: 'Guest User', isGuest: true, email: 'guest@electra.ai' });
  };

  const logout = async () => {
    await firebaseLogout();
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginAsGuest, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
