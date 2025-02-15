import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Rating,
} from '@mui/material';
import { Favorite, FavoriteBorder, LocationOn } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useWishlist } from '../context/WishlistContext';
import { styled } from '@mui/material/styles';

const ScrollContainer = styled(Box)({
  overflowX: 'auto',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  padding: '20px 0',
});

const CardContainer = styled(Box)({
  display: 'inline-block',
  whiteSpace: 'normal',
  verticalAlign: 'top',
  width: '300px', 
  marginRight: '16px',
  '&:last-child': {
    marginRight: 0
  }
});

const StyledCard = styled(Card)(({ theme, isDragging }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.2s ease-in-out',
  transform: isDragging ? 'scale(1.02)' : 'none',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const ImageContainer = styled(Box)({
  position: 'relative',
  paddingTop: '56.25%',
  overflow: 'hidden',
});

const StyledCardMedia = styled(CardMedia)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const WishlistButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}));

const MainContent = () => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [hotels, setHotels] = useState([
    {
      id: '1',
      name: 'The Oberoi Amarvilas',
      location: 'Agra, India',
      image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&q=80',
      price: 42000,
      rating: 4.8,
      reviews: 1250,
    },
    {
      id: '2',
      name: 'Taj Lake Palace',
      location: 'Udaipur, India',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      price: 38000,
      rating: 4.9,
      reviews: 980,
    },
    {
      id: '3',
      name: 'The Leela Palace',
      location: 'New Delhi, India',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
      price: 35000,
      rating: 4.7,
      reviews: 850,
    },
    {
      id: '4',
      name: 'ITC Grand Bharat',
      location: 'Gurugram, India',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      price: 32000,
      rating: 4.6,
      reviews: 720,
    },
    {
      id: '5',
      name: 'Rambagh Palace',
      location: 'Jaipur, India',
      image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
      price: 45000,
      rating: 4.8,
      reviews: 890,
    },
    {
      id: '6',
      name: 'The St. Regis Mumbai',
      location: 'Mumbai, India',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      price: 36000,
      rating: 4.5,
      reviews: 760,
    }
  ]);

  const handleWishlistToggle = (hotel, event) => {
    event.stopPropagation();
    if (isInWishlist(hotel.id)) {
      removeFromWishlist(hotel.id);
    } else {
      addToWishlist(hotel);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(hotels);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setHotels(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="hotels" direction="horizontal">
        {(provided) => (
          <ScrollContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {hotels.map((hotel, index) => (
              <Draggable 
                key={hotel.id} 
                draggableId={hotel.id} 
                index={index}
              >
                {(provided, snapshot) => (
                  <CardContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <StyledCard isDragging={snapshot.isDragging}>
                      <ImageContainer>
                        <StyledCardMedia
                          component="img"
                          image={hotel.image}
                          alt={hotel.name}
                        />
                        <WishlistButton
                          size="small"
                          onClick={(e) => handleWishlistToggle(hotel, e)}
                          color="error"
                          aria-label={isInWishlist(hotel.id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          {isInWishlist(hotel.id) ? <Favorite /> : <FavoriteBorder />}
                        </WishlistButton>
                      </ImageContainer>
                      <CardContent>
                        <Typography variant="h6" component="h2" noWrap gutterBottom>
                          {hotel.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {hotel.location}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={hotel.rating} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({hotel.reviews})
                          </Typography>
                        </Box>
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                          ₹{hotel.price.toLocaleString('en-IN')}
                          <Typography component="span" variant="body2" color="text.secondary">
                            /night
                          </Typography>
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </CardContainer>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ScrollContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default MainContent;
