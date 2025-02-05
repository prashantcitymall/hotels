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
  InputAdornment,
  Menu,
  MenuItem
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
import AuthDialog from './AuthDialog';
import { Favorite, Person, AccountCircle, Badge } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

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

const LeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
});

const IdProofButton = styled(Button)({  
  backgroundColor: '#1a73e8',
  color: 'white',
  textTransform: 'none',
  fontSize: '13px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 16px',
  borderRadius: '20px',
  fontWeight: '500',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: '#1557b0',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  transition: 'all 0.2s ease-in-out'
});;

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

const Header = () => {
  const [openWishlistDialog, setOpenWishlistDialog] = useState(false);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [openListPropertyDialog, setOpenListPropertyDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
  };

  const handleListPropertyClick = () => {
    setOpenListPropertyDialog(true);
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl" sx={{ minHeight: '25px' }}>
        <StyledToolbar>
          <LeftSection>
            <LogoContainer>
              <LogoIcon />
              <LogoText>
                Hotels
              </LogoText>
            </LogoContainer>
            {user && (
              <IdProofButton
                onClick={() => {
                  // Handle ID proof upload
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*,.pdf';
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      console.log('Selected file:', file);
                      // TODO: Implement file upload logic
                    }
                  };
                  input.click();
                }}
              >
                <Badge sx={{ fontSize: 20 }} />
                Upload ID Proof
              </IdProofButton>
            )}
          </LeftSection>
          <ButtonGroup>
            <WishlistButton
              onClick={() => setOpenWishlistDialog(true)}
              aria-label="View Wishlist"
            >
              <Favorite />
            </WishlistButton>
            {user ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                  sx={{
                    ml: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <AccountCircle />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {user.firstName}
                  </Typography>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="text"
                color="inherit"
                startIcon={<Person />}
                onClick={() => setOpenAuthDialog(true)}
                sx={{
                  ml: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Sign In
              </Button>
            )}
            <StyledButton variant="outlined" onClick={handleListPropertyClick}>
              List Your Property
            </StyledButton>
          </ButtonGroup>
        </StyledToolbar>
      </Container>
      <WishlistDialog
        open={openWishlistDialog}
        onClose={() => setOpenWishlistDialog(false)}
      />
      <AuthDialog
        open={openAuthDialog}
        onClose={() => setOpenAuthDialog(false)}
      />
      <ListPropertyForm
        open={openListPropertyDialog}
        onClose={() => setOpenListPropertyDialog(false)}
      />
    </StyledAppBar>
  );
};

export default Header;
