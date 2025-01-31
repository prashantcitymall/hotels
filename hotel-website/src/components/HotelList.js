import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Rating,
  Chip,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { LocationOn, LocalParking, Wifi, Restaurant } from '@mui/icons-material';

const StyledCard = styled(Card)({
  display: 'flex',
  marginBottom: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
});

const HotelImage = styled(CardMedia)({
  width: 300,
  height: 200,
  objectFit: 'cover',
});

const ContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const AmenitiesBox = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginTop: '12px',
});

const PriceBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  padding: '16px',
});

const mockHotelsData = {
  taj_mahal: [
    {
      id: 1,
      name: 'The Oberoi Amarvilas',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500',
      rating: 5,
      reviews: 1250,
      distance: '0.6 km from Taj Mahal',
      price: 25000,
      amenities: ['parking', 'wifi', 'restaurant'],
      description: 'Luxury hotel with breathtaking views of the Taj Mahal',
    },
    {
      id: 2,
      name: 'Taj Hotel & Convention Centre',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500',
      rating: 4.5,
      reviews: 980,
      distance: '1.2 km from Taj Mahal',
      price: 15000,
      amenities: ['parking', 'wifi', 'restaurant'],
      description: 'Modern luxury hotel with rooftop pool',
    },
  ],
  agra_fort: [
    {
      id: 3,
      name: 'Clarks Shiraz',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500',
      rating: 4.2,
      reviews: 850,
      distance: '0.8 km from Agra Fort',
      price: 12000,
      amenities: ['parking', 'wifi', 'restaurant'],
      description: 'Heritage hotel with fort views',
    },
    {
      id: 4,
      name: 'Crystal Sarovar Premiere',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500',
      rating: 4.0,
      reviews: 720,
      distance: '1.5 km from Agra Fort',
      price: 8000,
      amenities: ['parking', 'wifi', 'restaurant'],
      description: 'Contemporary hotel with city views',
    },
  ],
  fatehpur_sikri: [
    {
      id: 5,
      name: 'ITC Mughal',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500',
      rating: 4.8,
      reviews: 1100,
      distance: '1.0 km from Fatehpur Sikri',
      price: 18000,
      amenities: ['parking', 'wifi', 'restaurant'],
      description: 'Luxury resort with Mughal architecture',
    },
  ],
  // Add more areas with their respective hotels...
};

const getAmenityIcon = (amenity) => {
  switch (amenity) {
    case 'parking':
      return <LocalParking />;
    case 'wifi':
      return <Wifi />;
    case 'restaurant':
      return <Restaurant />;
    default:
      return null;
  }
};

const HotelList = ({ searchData, destinations }) => {
  const hotels = mockHotelsData[searchData.destination] || [];
  const selectedDestination = destinations.find(d => d.value === searchData.destination)?.label;

  if (hotels.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No hotels found for this location. Please try another area.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Available Hotels {searchData.destination && `near ${selectedDestination}`}
      </Typography>
      <Grid container spacing={3}>
        {hotels.map((hotel) => (
          <Grid item xs={12} key={hotel.id}>
            <StyledCard>
              <HotelImage
                image={hotel.image}
                title={hotel.name}
              />
              <ContentBox>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {hotel.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={hotel.rating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({hotel.reviews} reviews)
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      {hotel.distance}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {hotel.description}
                  </Typography>
                  <AmenitiesBox>
                    {hotel.amenities.map((amenity) => (
                      <Chip
                        key={amenity}
                        icon={getAmenityIcon(amenity)}
                        label={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </AmenitiesBox>
                </CardContent>
              </ContentBox>
              <PriceBox>
                <Box>
                  <Typography variant="h6" color="primary" align="right">
                    ₹{hotel.price.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    per night
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Book Now
                </Button>
              </PriceBox>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HotelList;
