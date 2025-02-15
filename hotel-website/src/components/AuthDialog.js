import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Tab,
  Tabs,
  InputAdornment,
} from '@mui/material';
import { Close, Phone, Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '400px',
    borderRadius: '12px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  height: '48px',
  backgroundColor: '#003580',
  color: 'white',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#00224f',
  },
}));

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const AuthDialog = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, loading } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      if (numbersOnly.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [name]: numbersOnly,
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (tabValue === 0) { // Login
        if (!formData.phone || !formData.password) {
          setError('Please enter both phone number and password');
          return;
        }

        if (formData.phone.length !== 10) {
          setError('Please enter a valid 10-digit phone number');
          return;
        }

        const loginResult = await login({
          phone: formData.phone,
          password: formData.password
        });

        if (loginResult.success) {
          onClose();
        } else {
          setError(loginResult.error || 'Login failed. Please check your credentials.');
        }
      } else { // Register
        if (!formData.firstName || !formData.lastName || !formData.phone || !formData.password) {
          setError('Please fill in all fields');
          return;
        }

        if (formData.phone.length !== 10) {
          setError('Please enter a valid 10-digit phone number');
          return;
        }

        const registerResult = await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          password: formData.password
        });

        if (registerResult.success) {
          onClose();
        } else {
          setError(registerResult.error || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tab label="Sign In" />
        <Tab label="Create Account" />
      </Tabs>
      <DialogContent>
        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        <TabPanel value={tabValue} index={0}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              margin="normal"
              required
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                    +91
                  </InputAdornment>
                ),
              }}
              placeholder="Enter 10 digit number"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formData.password}
              onChange={handleInputChange}
              margin="normal"
              required
              disabled={loading}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </StyledButton>
          </form>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              margin="normal"
              required
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                    +91
                  </InputAdornment>
                ),
              }}
              placeholder="Enter 10 digit number"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formData.password}
              onChange={handleInputChange}
              margin="normal"
              required
              disabled={loading}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </StyledButton>
          </form>
        </TabPanel>
      </DialogContent>
    </StyledDialog>
  );
};

export default AuthDialog;
