import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useFavorites } from './FavoritesContext';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { favorites, addFavorite, isFavorite } = useFavorites();
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const navigation = useNavigation();

  const fetchCocktails = async () => {
    try {
      const currentLetter = alphabet.charAt(page - 1);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${currentLetter}`);
      const data = await response.json();

      if (data.drinks) {
        setCocktails((prevCocktails) => [...prevCocktails, ...data.drinks]);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCocktails();
  }, [page]);

  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleToggleFavorite = (cocktail) => {
    if (!isFavorite(cocktail.idDrink)) {
      addFavorite(cocktail);
    } else {
      // Optional: Handle case where user tries to like a cocktail already in favorites
      // You can display an error message or take other action
    }
  };

  const handleShowDetails = (cocktail) => {
    // Navigate to the DetailsPage with the selected cocktail
    navigation.navigate('Details', { cocktail });
  };

  const renderItem = ({ item }) => (
    <View style={styles.cocktailContainer}>
      <Image source={{ uri: item.strDrinkThumb }} style={styles.cocktailImage} />
      <Text style={styles.cocktailName}>{item.strDrink}</Text>
      <TouchableOpacity onPress={() => handleToggleFavorite(item)} style={styles.favoriteButton}>
        <Text style={styles.favoriteButtonText}>❤️ J'aime</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleShowDetails(item)} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Détails</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails}
        keyExtractor={(item) => item.idDrink}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  cocktailContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cocktailImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cocktailName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  favoriteButton: {
    backgroundColor: '#FF5733',
    padding: 8,
    borderRadius: 8,
  },
  favoriteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsButton: {
    marginLeft: 10,
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
});

export default HomeScreen;
