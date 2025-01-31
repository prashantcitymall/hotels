import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Popover,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import {
  LocationOn,
  Person,
  CalendarMonth,
  Add,
  Remove,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import HotelList from './HotelList';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  margin: '0',
  width: '100%',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  height: '45px',
  backgroundColor: '#003580',
  color: 'white',
  fontWeight: 600,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#00224f',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 53, 128, 0.2)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: '45px',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 53, 128, 0.04)',
      transform: 'translateY(-1px)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 53, 128, 0.1)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 53, 128, 0.2)',
  },
  '& .MuiInputBase-input': {
    cursor: 'pointer',
    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.6)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  '& .MuiInputAdornment-root': {
    marginRight: '8px',
  },
}));

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    height: '45px',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 53, 128, 0.04)',
      transform: 'translateY(-1px)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 53, 128, 0.1)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 53, 128, 0.2)',
  },
  '& .MuiInputBase-input': {
    cursor: 'pointer',
  },
}));

const SearchTitle = styled(Typography)(({ theme }) => ({
  fontSize: '42px',
  fontWeight: 700,
  color: 'white',
  textAlign: 'center',
  marginBottom: '24px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
}));

const SearchSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: 'white',
  textAlign: 'center',
  marginBottom: '32px',
  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
}));

const TravellerPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    padding: '24px',
    width: '320px',
    borderRadius: '12px',
  },
}));

const TravellerCategory = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
}));

const CounterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

const CounterButton = styled(IconButton)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  borderRadius: '50%',
  padding: '4px',
  '&.Mui-disabled': {
    border: '1px solid #f5f5f5',
  },
}));

const destinations = [
  { value: 'taj_mahal', label: 'Taj Mahal Area' },
  { value: 'agra_fort', label: 'Agra Fort Area' },
  { value: 'fatehpur_sikri', label: 'Fatehpur Sikri' },
  { value: 'sikandra', label: 'Akbar\'s Tomb, Sikandra' },
  { value: 'mehtab_bagh', label: 'Mehtab Bagh Area' },
  { value: 'kinari_bazaar', label: 'Kinari Bazaar Area' },
  { value: 'jama_masjid', label: 'Jama Masjid Area' },
  { value: 'itimad_ud_daulah', label: 'Tomb of I\'timād-ud-Daulah' },
  { value: 'sadar_bazaar', label: 'Sadar Bazaar Area' },
  { value: 'ram_bagh', label: 'Ram Bagh Area' }
];

const childrenOptions = [
  { value: 0, label: 'No children' },
  { value: 1, label: '1 child' },
  { value: 2, label: '2 children' },
  { value: 3, label: '3 children' },
  { value: 4, label: '4 children' },
];

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: null,
    checkOut: null,
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [showResults, setShowResults] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTravellerClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTravellerClose = () => {
    setAnchorEl(null);
  };

  const handleTravellerChange = (type, operation) => {
    const limits = {
      adults: { min: 1, max: 9 },
      children: { min: 0, max: 6 },
      infants: { min: 0, max: 6 },
    };

    setSearchData(prev => {
      const newValue = operation === 'add' ? prev[type] + 1 : prev[type] - 1;
      if (newValue >= limits[type].min && newValue <= limits[type].max) {
        return { ...prev, [type]: newValue };
      }
      return prev;
    });
  };

  const getTotalTravellers = () => {
    const total = searchData.adults + searchData.children + searchData.infants;
    return `${total} traveller${total !== 1 ? 's' : ''}`;
  };

  const handleDateChange = (field, value) => {
    // If the value is a string (manual input), try to parse it
    if (typeof value === 'string') {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        setSearchData(prev => ({
          ...prev,
          [field]: parsedDate
        }));
      }
      return;
    }
    
    // If it's a Date object (from picker)
    setSearchData(prev => ({
      ...prev,
      [field]: value,
      // Reset checkout if checkin is after checkout
      ...(field === 'checkIn' && value > prev.checkOut ? { checkOut: null } : {})
    }));
  };

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    if (searchData.destination && searchData.checkIn && searchData.checkOut) {
      setShowResults(true);
    }
  };

  return (
    <>
      <Box sx={{ 
        width: '100%', 
        maxWidth: '1000px', 
        margin: '80px auto',
        padding: '0 16px'
      }}>
        <SearchTitle variant="h1">
          Find Your Best Stay In Agra
        </SearchTitle>
        <SearchSubtitle>
          Search low prices on hotels, homes and much more...
        </SearchSubtitle>
        <StyledPaper elevation={3}>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <StyledTextField
                  select
                  fullWidth
                  label="Where in Agra?"
                  value={searchData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn color="primary" sx={{ fontSize: 24 }} />
                      </InputAdornment>
                    ),
                  }}
                >
                  {destinations.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledTextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledTextField
                  fullWidth
                  label="Travellers"
                  value={getTotalTravellers()}
                  onClick={handleTravellerClick}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" sx={{ fontSize: 24 }} />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
                <TravellerPopover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleTravellerClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <TravellerCategory>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Adults
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Age 12+ years
                      </Typography>
                    </Box>
                    <CounterBox>
                      <CounterButton
                        onClick={() => handleTravellerChange('adults', 'subtract')}
                        disabled={searchData.adults <= 1}
                        size="small"
                      >
                        <Remove fontSize="small" />
                      </CounterButton>
                      <Typography>{searchData.adults}</Typography>
                      <CounterButton
                        onClick={() => handleTravellerChange('adults', 'add')}
                        disabled={searchData.adults >= 9}
                        size="small"
                      >
                        <Add fontSize="small" />
                      </CounterButton>
                    </CounterBox>
                  </TravellerCategory>

                  <TravellerCategory>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Children
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Age 2-12 years
                      </Typography>
                    </Box>
                    <CounterBox>
                      <CounterButton
                        onClick={() => handleTravellerChange('children', 'subtract')}
                        disabled={searchData.children <= 0}
                        size="small"
                      >
                        <Remove fontSize="small" />
                      </CounterButton>
                      <Typography>{searchData.children}</Typography>
                      <CounterButton
                        onClick={() => handleTravellerChange('children', 'add')}
                        disabled={searchData.children >= 6}
                        size="small"
                      >
                        <Add fontSize="small" />
                      </CounterButton>
                    </CounterBox>
                  </TravellerCategory>

                  <TravellerCategory>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Infants
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Below 2 years
                      </Typography>
                    </Box>
                    <CounterBox>
                      <CounterButton
                        onClick={() => handleTravellerChange('infants', 'subtract')}
                        disabled={searchData.infants <= 0}
                        size="small"
                      >
                        <Remove fontSize="small" />
                      </CounterButton>
                      <Typography>{searchData.infants}</Typography>
                      <CounterButton
                        onClick={() => handleTravellerChange('infants', 'add')}
                        disabled={searchData.infants >= 6}
                        size="small"
                      >
                        <Add fontSize="small" />
                      </CounterButton>
                    </CounterBox>
                  </TravellerCategory>
                </TravellerPopover>
              </Grid>
            </Grid>

            {/* Second Row */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StyledDatePicker
                    label="Check-in"
                    value={searchData.checkIn}
                    onChange={(date) => handleDateChange('checkIn', date)}
                    minDate={new Date()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonth color="primary" sx={{ fontSize: 24 }} />
                            </InputAdornment>
                          ),
                        },
                      },
                      popper: {
                        sx: {
                          '& .MuiPaper-root': {
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            borderRadius: '12px',
                          },
                          '& .MuiPickersDay-root': {
                            fontSize: '0.875rem',
                            '&.Mui-selected': {
                              backgroundColor: '#003580',
                              '&:hover': {
                                backgroundColor: '#00224f',
                              },
                            },
                          },
                        }
                      }
                    }}
                    format="MM/dd/yyyy"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={5}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StyledDatePicker
                    label="Check-out"
                    value={searchData.checkOut}
                    onChange={(date) => handleDateChange('checkOut', date)}
                    minDate={searchData.checkIn || new Date()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonth color="primary" sx={{ fontSize: 24 }} />
                            </InputAdornment>
                          ),
                        },
                      },
                      popper: {
                        sx: {
                          '& .MuiPaper-root': {
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            borderRadius: '12px',
                          },
                          '& .MuiPickersDay-root': {
                            fontSize: '0.875rem',
                            '&.Mui-selected': {
                              backgroundColor: '#003580',
                              '&:hover': {
                                backgroundColor: '#00224f',
                              },
                            },
                          },
                        }
                      }
                    }}
                    format="MM/dd/yyyy"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={2}>
                <StyledButton
                  variant="contained"
                  fullWidth
                  onClick={handleSearch}
                >
                  Search
                </StyledButton>
              </Grid>
            </Grid>
          </Box>
        </StyledPaper>
      </Box>
      {showResults && (
        <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <HotelList searchData={searchData} destinations={destinations} />
        </Box>
      )}
    </>
  );
};

export default SearchBar;
