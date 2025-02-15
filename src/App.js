import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Header from './components/Header/Header';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <ThemeProvider theme={{
        palette: {
          primary: {
            main: '#1a237e',
          },
        },
      }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Header />
          <Home />
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
