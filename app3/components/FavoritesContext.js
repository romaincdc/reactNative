import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (cocktail) => {
    setFavorites((prevFavorites) => [...prevFavorites, cocktail]);
  };

  const removeFavorite = (idDrink) => {
    setFavorites((prevFavorites) => prevFavorites.filter((cocktail) => cocktail.idDrink !== idDrink));
  };

  const isFavorite = (idDrink) => {
    return favorites.some((cocktail) => cocktail.idDrink === idDrink);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
