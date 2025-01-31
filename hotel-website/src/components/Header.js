import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Container, 
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { HotelOutlined } from '@mui/icons-material';
import ListPropertyForm from './ListPropertyForm';
import WishlistDialog from './WishlistDialog';
import { Favorite } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#003580',
  color: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  minHeight: '25px',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2px 0',
  minHeight: '25px',
  '& .MuiToolbar-root': {
    minHeight: '25px',
  }
});

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'white',
});

const LogoIcon = styled(HotelOutlined)({
  fontSize: '24px',
  color: 'white',
});

const LogoText = styled(Typography)({
  fontSize: '16px',
  fontWeight: 700,
  color: 'white',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

const ButtonGroup = styled(Box)({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  height: '25px',
});

const StyledButton = styled(Button)(({ variant }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '13px',
  padding: '4px 12px',
  minHeight: '24px',
  lineHeight: '1',
  borderRadius: '4px',
  transition: 'all 0.2s ease-in-out',
  ...(variant === 'contained' ? {
    backgroundColor: 'white',
    color: '#003580',
    border: '1px solid white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.9)',
    },
  } : {
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid white',
    },
  }),
}));

const WishlistButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  padding: '4px',
  marginRight: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const FormDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    width: '400px',
    maxWidth: '90%',
  },
});

const Header = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openListPropertyDialog, setOpenListPropertyDialog] = useState(false);
  const [openWishlistDialog, setOpenWishlistDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    phone: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    fullName: '',
    dateOfBirth: null,
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleClickOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);
  const handleClickOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleListPropertyClick = () => {
    setOpenListPropertyDialog(true);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setRegisterData(prev => ({
      ...prev,
      dateOfBirth: date
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        handleCloseSignIn();
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const formattedData = {
        ...registerData,
        dateOfBirth: registerData.dateOfBirth ? format(registerData.dateOfBirth, 'yyyy-MM-dd') : null
      };

      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        handleCloseRegister();
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl" sx={{ minHeight: '25px' }}>
        <StyledToolbar>
          <LogoContainer>
            <LogoIcon />
            <LogoText>
              AGRA HOTELS
            </LogoText>
          </LogoContainer>
          <ButtonGroup>
            <WishlistButton
              onClick={() => setOpenWishlistDialog(true)}
              aria-label="View Wishlist"
            >
              <Favorite />
            </WishlistButton>
            <StyledButton variant="outlined" onClick={handleListPropertyClick}>
              List Your Property
            </StyledButton>
            <StyledButton variant="outlined" onClick={handleClickOpenRegister}>
              Register
            </StyledButton>
            <StyledButton variant="contained" onClick={handleClickOpenSignIn}>
              Sign in
            </StyledButton>
          </ButtonGroup>
        </StyledToolbar>
      </Container>

      <FormDialog open={openSignIn} onClose={handleCloseSignIn}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '24px' }}>Sign In</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <TextField
              name="phone"
              label="Phone Number"
              type="tel"
              fullWidth
              value={loginData.phone}
              onChange={handleLoginInputChange}
              inputProps={{
                pattern: '[0-9]*',
                maxLength: 10
              }}
              sx={{ fontSize: '18px' }}
            />
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={loginData.password}
              onChange={handleLoginInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ fontSize: '18px' }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '20px' }}>
          <Button onClick={handleCloseSignIn} size="large">Cancel</Button>
          <Button onClick={handleLogin} variant="contained" color="primary" size="large">
            Sign In
          </Button>
        </DialogActions>
      </FormDialog>

      <FormDialog open={openRegister} onClose={handleCloseRegister}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '24px' }}>Register</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              value={registerData.fullName}
              onChange={handleRegisterInputChange}
              sx={{ fontSize: '18px' }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={registerData.dateOfBirth}
                onChange={handleDateChange}
                renderInput={(props) => <TextField {...props} fullWidth />}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { fontSize: '18px' }
                  }
                }}
              />
            </LocalizationProvider>
            <TextField
              name="phone"
              label="Phone Number"
              type="tel"
              fullWidth
              value={registerData.phone}
              onChange={handleRegisterInputChange}
              inputProps={{
                pattern: '[0-9]*',
                maxLength: 10
              }}
              sx={{ fontSize: '18px' }}
            />
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={registerData.password}
              onChange={handleRegisterInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ fontSize: '18px' }}
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              value={registerData.confirmPassword}
              onChange={handleRegisterInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ fontSize: '18px' }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '20px' }}>
          <Button onClick={handleCloseRegister} size="large">Cancel</Button>
          <Button onClick={handleRegister} variant="contained" color="primary" size="large">
            Register
          </Button>
        </DialogActions>
      </FormDialog>

      <ListPropertyForm
        open={openListPropertyDialog}
        onClose={() => setOpenListPropertyDialog(false)}
      />

      <WishlistDialog
        open={openWishlistDialog}
        onClose={() => setOpenWishlistDialog(false)}
      />
    </StyledAppBar>
  );
};

export default Header;
