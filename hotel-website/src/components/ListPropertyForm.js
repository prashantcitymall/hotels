import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
} from '@mui/material';
import {
  PhotoCamera,
  CloudUpload,
  NavigateNext,
  NavigateBefore,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImagePreview = styled(Card)({
  width: 200,
  height: 200,
  margin: '10px',
  position: 'relative',
});

// Form steps
const steps = [
  'Basic Information',
  'Location & Address',
  'Facilities & Amenities',
  'Room Types & Pricing',
  'Photos & Media'
];

const facilities = [
  { name: 'WiFi', label: 'Free WiFi' },
  { name: 'swimmingPool', label: 'Swimming Pool' },
  { name: 'gym', label: 'Fitness Center/Gym' },
  { name: 'yogaRoom', label: 'Yoga Room' },
  { name: 'parking', label: 'Parking' },
  { name: 'restaurant', label: 'Restaurant' },
  { name: 'spa', label: 'Spa & Wellness' },
  { name: 'airConditioning', label: 'Air Conditioning' },
  { name: 'bar', label: 'Bar/Lounge' },
  { name: 'roomService', label: 'Room Service' },
  { name: 'conferenceRoom', label: 'Conference Facilities' },
  { name: 'childrenPlay', label: 'Children\'s Play Area' }
];

const roomTypes = [
  'Standard Single',
  'Standard Double',
  'Deluxe Single',
  'Deluxe Double',
  'Suite',
  'Executive Suite',
  'Family Room'
];

const ListPropertyForm = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Information
    propertyName: '',
    propertyType: '',
    description: '',
    starRating: '',
    
    // Location & Address
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    
    // Facilities
    facilities: {},
    
    // Room Types
    rooms: [
      {
        type: '',
        price: '',
        capacity: '',
        quantity: '',
        facilities: []
      }
    ],
    
    // Photos
    photos: []
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFacilityChange = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility]
      }
    }));
  };

  const handleAddRoom = () => {
    setFormData(prev => ({
      ...prev,
      rooms: [...prev.rooms, {
        type: '',
        price: '',
        capacity: '',
        quantity: '',
        facilities: []
      }]
    }));
  };

  const handleRoomChange = (index, field, value) => {
    const newRooms = [...formData.rooms];
    newRooms[index] = {
      ...newRooms[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      rooms: newRooms
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Name"
                value={formData.propertyName}
                onChange={(e) => handleInputChange('propertyName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  label="Property Type"
                >
                  <MenuItem value="hotel">Hotel</MenuItem>
                  <MenuItem value="resort">Resort</MenuItem>
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="villa">Villa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Property Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Star Rating</InputLabel>
                <Select
                  value={formData.starRating}
                  onChange={(e) => handleInputChange('starRating', e.target.value)}
                  label="Star Rating"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <MenuItem key={rating} value={rating}>
                      {rating} Star
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State/Province"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP/Postal Code"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                required
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <FormGroup>
            <Grid container spacing={2}>
              {facilities.map((facility) => (
                <Grid item xs={12} sm={6} md={4} key={facility.name}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.facilities[facility.name] || false}
                        onChange={() => handleFacilityChange(facility.name)}
                      />
                    }
                    label={facility.label}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        );

      case 3:
        return (
          <Box>
            {formData.rooms.map((room, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Room Type</InputLabel>
                    <Select
                      value={room.type}
                      onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
                      label="Room Type"
                    >
                      {roomTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price per Night"
                    type="number"
                    value={room.price}
                    onChange={(e) => handleRoomChange(index, 'price', e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Room Capacity"
                    type="number"
                    value={room.capacity}
                    onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Number of Rooms"
                    type="number"
                    value={room.quantity}
                    onChange={(e) => handleRoomChange(index, 'quantity', e.target.value)}
                  />
                </Grid>
              </Grid>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddRoom}
              sx={{ mt: 2 }}
            >
              Add Another Room Type
            </Button>
          </Box>
        );

      case 4:
        return (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                  sx={{ mr: 2 }}
                >
                  Upload from Drive
                  <VisuallyHiddenInput
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<PhotoCamera />}
                >
                  Take Photo
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoUpload}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                  {formData.photos.map((photo, index) => (
                    <ImagePreview key={index}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={photo.preview}
                        alt={`Property photo ${index + 1}`}
                      />
                    </ImagePreview>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '80vh',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          List Your Property
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      <DialogContent>
        <StyledPaper>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<NavigateBefore />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              endIcon={activeStep === steps.length - 1 ? null : <NavigateNext />}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </StyledPaper>
      </DialogContent>
    </Dialog>
  );
};

export default ListPropertyForm;
