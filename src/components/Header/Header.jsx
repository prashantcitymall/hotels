import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';

const StyledAppBar = styled(AppBar)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Typography)`
  color: #1a237e;
  font-weight: 700;
  font-size: 1.8rem;
  background: linear-gradient(45deg, #1a237e, #3949ab);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavButton = styled(Button)`
  margin: 0 8px;
  color: #1a237e;
  font-weight: 500;
  
  &:hover {
    background: rgba(26, 35, 126, 0.1);
  }
`;

const Header = () => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box display="flex" alignItems="center">
            <HomeIcon sx={{ fontSize: 32, mr: 1, color: '#1a237e' }} />
            <Logo variant="h6">HOTELIFY</Logo>
          </Box>
        </motion.div>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box display="flex" alignItems="center">
            <NavButton>List Your Property</NavButton>
            <NavButton startIcon={<FavoriteIcon />}>Wishlist</NavButton>
            <NavButton startIcon={<AccountCircleIcon />}>Profile</NavButton>
            <NavButton variant="outlined" sx={{ borderColor: '#1a237e' }}>Login</NavButton>
            <NavButton 
              variant="contained" 
              sx={{ 
                bgcolor: '#1a237e',
                '&:hover': { bgcolor: '#283593' }
              }}
            >
              Sign Up
            </NavButton>
          </Box>
        </motion.div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
