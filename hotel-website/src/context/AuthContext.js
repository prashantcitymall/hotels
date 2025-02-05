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
      console.log('Login - Sending request:', {
        phone: credentials.phone,
        password: '***'
      });
      
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

      console.log('Login - Response status:', response.status);

      const data = await response.json();
      console.log('Login - Raw response:', {
        ...data,
        token: data.token ? '***' : undefined
      });

      if (!response.ok) {
        const errorMessage = data.error || data.message || 'Login failed';
        console.log('Login - Error:', errorMessage);
        throw new Error(errorMessage);
      }

      if (!data) {
        console.log('Login - Error: No data received');
        throw new Error('No data received from server');
      }

      // Build user data object from response
      const finalUserData = {
        userId: data.userId,
        phone: data.phone || credentials.phone,
        token: data.token || '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        fullName: data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'User'
      };

      console.log('Login - Final user data:', {
        ...finalUserData,
        token: '***'
      });

      // Set user data from response
      const userData = {
        userId: data.userId,
        phone: data.phone || credentials.phone,
        token: data.token || '',
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        fullName: data.fullName || data.full_name || `${data.firstName || ''} ${data.lastName || ''}`.trim()
      };

      // If we still don't have a fullName, try to construct it
      if (!userData.fullName && (userData.firstName || userData.lastName)) {
        userData.fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
      }

      console.log('Login - Setting user data:', {
        ...userData,
        token: '***',
        firstName: userData.firstName || '[empty]',
        lastName: userData.lastName || '[empty]',
        fullName: userData.fullName || '[empty]'
      });

      // Save user data and return success
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Login - Successfully saved user data');
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.message || 'An unexpected error occurred';
      console.error('Registration error details:', errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (registrationData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sending registration data:', {
        ...registrationData,
        password: '***' // Don't log the actual password
      });
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: `${registrationData.firstName} ${registrationData.lastName}`,
          dateOfBirth: new Date().toISOString().split('T')[0],
          phone: registrationData.phone,
          password: registrationData.password
        })
      });

      const data = await response.json();
      console.log('Register response:', {
        ...data,
        token: data.token ? '***' : undefined // Don't log the actual token
      });
      
      if (!response.ok && data.error) {
        throw new Error(data.error);
      }
      
      // If user already exists, try to log in
      if (data.message === 'User already exists') {
        console.log('User already exists, attempting login...');
        return await login({
          phone: registrationData.phone,
          password: registrationData.password
        });
      }

      // Set user data directly from registration response
      console.log('Setting user data after registration');
      const newUserData = {
        phone: data.phone || registrationData.phone,
        token: data.token || '',
        firstName: data.firstName || registrationData.firstName || '',
        lastName: data.lastName || registrationData.lastName || '',
        fullName: data.fullName || `${registrationData.firstName} ${registrationData.lastName}` || ''
      };
      
      console.log('Setting user data after registration:', { ...newUserData, token: '***' });
      setUser(newUserData);
      localStorage.setItem('user', JSON.stringify(newUserData));
      return { success: true };
      
      // Don't need to login again since we already have the user data
      /*return await login({
        phone: userData.phone,
        password: userData.password
      });*/
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.message || 'An unexpected error occurred';
      console.error('Registration error details:', errorMessage);
      return { success: false, error: errorMessage };
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
