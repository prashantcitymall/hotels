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
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  LocationOn,
  Person,
  CalendarMonth,
  Add,
  Remove,
  CurrencyRupee,
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
  backgroundColor: '#003580',
  color: 'white',
  padding: '10px 40px',
  fontSize: '16px',
  fontWeight: 'bold',
  minWidth: '150px',
  height: '48px',
  '&:hover': {
    backgroundColor: '#00224f',
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

const StyledSelect = styled(Select)(({ theme }) => ({
  height: '45px',
  '& .MuiSelect-select': {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 53, 128, 0.2)',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 53, 128, 0.04)',
    transform: 'translateY(-1px)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 53, 128, 0.3)',
    },
  },
  '&.Mui-focused': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 53, 128, 0.1)',
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

const TravelerPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    padding: '24px',
    width: '320px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    marginTop: '8px',
  },
}));

const CounterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 0',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const CounterControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

const CounterButton = styled(IconButton)(({ theme, disabled }) => ({
  backgroundColor: disabled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 53, 128, 0.1)',
  '&:hover': {
    backgroundColor: disabled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 53, 128, 0.2)',
  },
}));

const SearchButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  marginTop: '10px',
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

const priceRanges = [
  { value: '0-500', label: '₹0 - ₹500' },
  { value: '500-1000', label: '₹500 - ₹1,000' },
  { value: '1000-2000', label: '₹1,000 - ₹2,000' },
  { value: '2000+', label: '₹2,000+' },
];

const getTravelersText = (adults, children, infants) => {
  const parts = [];
  if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
  if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
  if (infants > 0) parts.push(`${infants} Infant${infants > 1 ? 's' : ''}`);
  return parts.length > 0 ? parts.join(', ') : 'Add travelers';
};

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: null,
    checkOut: null,
    adults: 1,
    children: 0,
    infants: 0,
    priceRange: '',
  });

  const [showResults, setShowResults] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleTravelerChange = (type, operation) => {
    const limits = {
      adults: { min: 1, max: 9 },
      children: { min: 0, max: 6 },
      infants: { min: 0, max: 4 },
    };

    setSearchData(prev => {
      const currentValue = prev[type];
      let newValue = operation === 'add' ? currentValue + 1 : currentValue - 1;
      newValue = Math.min(Math.max(newValue, limits[type].min), limits[type].max);
      
      return {
        ...prev,
        [type]: newValue,
      };
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
                  value={getTravelersText(searchData.adults, searchData.children, searchData.infants)}
                  onClick={(event) => handleClick(event)}
                  placeholder="Add travelers"
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: 'rgba(0, 53, 128, 0.7)' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TravelerPopover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Box>
                    <CounterContainer>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Adults
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Age 13+
                        </Typography>
                      </Box>
                      <CounterControls>
                        <CounterButton
                          size="small"
                          onClick={() => handleTravelerChange('adults', 'subtract')}
                          disabled={searchData.adults <= 1}
                        >
                          <Remove fontSize="small" />
                        </CounterButton>
                        <Typography sx={{ minWidth: '24px', textAlign: 'center' }}>
                          {searchData.adults}
                        </Typography>
                        <CounterButton
                          size="small"
                          onClick={() => handleTravelerChange('adults', 'add')}
                          disabled={searchData.adults >= 9}
                        >
                          <Add fontSize="small" />
                        </CounterButton>
                      </CounterControls>
                    </CounterContainer>

                    <CounterContainer>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Children
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Ages 2-12
                        </Typography>
                      </Box>
                      <CounterControls>
                        <CounterButton
                          size="small"
                          onClick={() => handleTravelerChange('children', 'subtract')}
                          disabled={searchData.children <= 0}
                        >
                          <Remove fontSize="small" />
                        </CounterButton>
                        <Typography sx={{ minWidth: '24px', textAlign: 'center' }}>
                          {searchData.children}
                        </Typography>
                        <CounterButton
                          size="small"
                          onClick={() => handleTravelerChange('children', 'add')}
                          disabled={searchData.children >= 6}
                        >
                          <Add fontSize="small" />
                        </CounterButton>
                      </CounterControls>
                    </CounterContainer>

                    <CounterContainer>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Infants
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Under 2
                        </Typography>
                      </Box>
                      <CounterControls>
                        <CounterButton
                          size="small"
                          onClick={() => handleTravelerChange('infants', 'subtract')}
                          disabled={searchData.infants <= 0}
                        >
                          <Remove fontSize="small" />
                        </CounterButton>
                        <Typography sx={{ minWidth: '24px', textAlign: 'center' }}>
                          {searchData.infants}
                        </Typography>
                        <CounterButton
                          size="small"
                          onClick={() => handleTravelerChange('infants', 'add')}
                          disabled={searchData.infants >= 4}
                        >
                          <Add fontSize="small" />
                        </CounterButton>
                      </CounterControls>
                    </CounterContainer>
                  </Box>
                </TravelerPopover>
              </Grid>
            </Grid>

            {/* Second Row */}
            <Grid container spacing={3} justifyContent="center">
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
                <FormControl fullWidth>
                  <StyledSelect
                    value={searchData.priceRange}
                    onChange={(e) => handleInputChange('priceRange', e.target.value)}
                    displayEmpty
                    startAdornment={
                      <InputAdornment position="start">
                        <CurrencyRupee sx={{ color: 'rgba(0, 53, 128, 0.7)', ml: 1 }} />
                      </InputAdornment>
                    }
                    renderValue={(selected) => {
                      if (!selected) {
                        return 'Select Price Range';
                      }
                      return priceRanges.find(range => range.value === selected)?.label;
                    }}
                  >
                    <MenuItem value="">
                      <em>Any Price</em>
                    </MenuItem>
                    {priceRanges.map((range) => (
                      <MenuItem key={range.value} value={range.value}>
                        {range.label}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <StyledButton
                  variant="contained"
                  sx={{ width: 'auto', px: 4 }}
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
