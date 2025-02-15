import React, { useState } from 'react';
import { 
  Paper, 
  Box, 
  TextField, 
  Button, 
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
`;

const SearchForm = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleGuestChange = (type) => (event) => {
    setGuests(prev => ({
      ...prev,
      [type]: event.target.value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom sx={{ color: '#1a237e', fontWeight: 600 }}>
          Find Your Perfect Stay in Agra
        </Typography>
        
        <Box component="form" sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <FormControl fullWidth>
                <InputLabel>Adults</InputLabel>
                <Select
                  value={guests.adults}
                  label="Adults"
                  onChange={handleGuestChange('adults')}
                >
                  {[...Array(10)].map((_, i) => (
                    <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Children</InputLabel>
                <Select
                  value={guests.children}
                  label="Children"
                  onChange={handleGuestChange('children')}
                >
                  {[...Array(6)].map((_, i) => (
                    <MenuItem key={i} value={i}>{i}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Infants</InputLabel>
                <Select
                  value={guests.infants}
                  label="Infants"
                  onChange={handleGuestChange('infants')}
                >
                  {[...Array(4)].map((_, i) => (
                    <MenuItem key={i} value={i}>{i}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Check-in Date"
                  value={checkInDate}
                  onChange={setCheckInDate}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={new Date()}
                />
                <DatePicker
                  label="Check-out Date"
                  value={checkOutDate}
                  onChange={setCheckOutDate}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={checkInDate || new Date()}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ px: 2 }}>
              <Typography gutterBottom>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={500}
                sx={{ color: '#1a237e' }}
              />
            </Box>

            <Button 
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: '#1a237e',
                '&:hover': { bgcolor: '#283593' },
                py: 1.5
              }}
            >
              Search Hotels
            </Button>
          </Stack>
        </Box>
      </StyledPaper>
    </motion.div>
  );
};

export default SearchForm;
