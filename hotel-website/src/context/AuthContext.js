import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sending login request:', credentials);
      
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: credentials.phone,
          password: credentials.password
        })
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data) {
        throw new Error('No data received from server');
      }

      // Set user data from response, handling potential undefined values
      const userData = {
        phone: credentials.phone,
        token: data.token || '',
        firstName: '',
        lastName: ''
      };

      // Only try to split the name if it exists
      if (data.full_name) {
        const nameParts = data.full_name.split(' ');
        userData.firstName = nameParts[0] || '';
        userData.lastName = nameParts[1] || '';
      }

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: `${userData.firstName} ${userData.lastName}`,
          dateOfBirth: new Date().toISOString().split('T')[0],
          phone: userData.phone,
          password: userData.password
        })
      });

      const data = await response.json();
      console.log('Register response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // After successful registration, log in
      return await login({
        phone: userData.phone,
        password: userData.password
      });
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, error, loading }}>
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
