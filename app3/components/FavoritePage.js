import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFavorites } from './FavoritesContext';
import { useNavigation } from '@react-navigation/native';

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemoveFavorite = (idDrink) => {
    removeFavorite(idDrink);
  };
  const navigation = useNavigation();
  const handleShowDetails = (cocktail) => {
    // Navigate to the DetailsPage with the selected cocktail
    navigation.navigate('Details', { cocktail });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cocktails Favoris</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <View style={styles.favoriteContainer}>
            <Image source={{ uri: item.strDrinkThumb }} style={styles.favoriteImage} />
            <Text style={styles.favoriteName}>{item.strDrink}</Text>
            <TouchableOpacity onPress={() => handleRemoveFavorite(item.idDrink)} style={styles.removeFavoriteButton}>
              <Text style={styles.removeFavoriteButtonText}>❌ Retirer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShowDetails(item)} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Détails</Text>
      </TouchableOpacity>
          </View>
        )}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoriteContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  removeFavoriteButton: {
    backgroundColor: '#FF5733',
    padding: 8,
    borderRadius: 8,
  },
  removeFavoriteButtonText: {
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
});

export default FavoritesPage;
