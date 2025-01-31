import React, { createContext, useState, useContext, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage on initial render
    const savedWishlist = localStorage.getItem('hotelWishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem('hotelWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (hotel) => {
    setWishlist(prev => {
      if (!prev.some(item => item.id === hotel.id)) {
        return [...prev, hotel];
      }
      return prev;
    });
  };

  const removeFromWishlist = (hotelId) => {
    setWishlist(prev => prev.filter(hotel => hotel.id !== hotelId));
  };

  const isInWishlist = (hotelId) => {
    return wishlist.some(hotel => hotel.id === hotelId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
