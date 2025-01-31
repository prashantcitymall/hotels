import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Box,
  Button,
} from '@mui/material';
import { Close, Favorite, LocationOn, Star } from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  position: 'relative',
}));

const WishlistDialog = ({ open, onClose }) => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          My Wishlist ({wishlist.length})
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {wishlist.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Your wishlist is empty. Start adding hotels you love!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {wishlist.map((hotel) => (
              <Grid item xs={12} key={hotel.id}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, height: 150 }}
                    image={hotel.image}
                    alt={hotel.name}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {hotel.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {hotel.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Star sx={{ fontSize: 18, mr: 0.5, color: '#ffc107' }} />
                      <Typography variant="body2">
                        {hotel.rating} ({hotel.reviews} reviews)
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      ${hotel.price}
                      <Typography component="span" variant="body2" color="text.secondary">
                        /night
                      </Typography>
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 1, position: 'absolute', top: 0, right: 0 }}>
                    <IconButton
                      onClick={() => removeFromWishlist(hotel.id)}
                      color="error"
                      size="small"
                    >
                      <Favorite />
                    </IconButton>
                  </Box>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WishlistDialog;
