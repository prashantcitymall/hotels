import React from 'react';
import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MainContent from './components/MainContent';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003580',
    },
    secondary: {
      main: '#febb02',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <WishlistProvider>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ 
              backgroundColor: '#003580',
              height: '50px',
              position: 'relative'
            }}>
              <Header />
            </Box>
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                },
                backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <Container 
              maxWidth="xl" 
              sx={{ 
                position: 'relative',
                zIndex: 1,
                pt: 2
              }}
            >
              <SearchBar />
              <MainContent />
            </Container>
          </Box>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
