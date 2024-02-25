import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailsPage = ({ route }) => {
  const { cocktail } = route.params;
  const [ingredientsWithImages, setIngredientsWithImages] = useState([]);

  useEffect(() => {
    const getIngredientsWithImages = async () => {
      const ingredientsWithImages = [];
      for (let i = 1; i <= 15; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        if (cocktail[ingredientKey]) {
          const ingredientName = cocktail[ingredientKey];
          const ingredientImage = await getIngredientImage(ingredientName);
          ingredientsWithImages.push({
            name: ingredientName,
            measure: cocktail[measureKey],
            image: ingredientImage,
          });
        } else {
          break;
        }
      }
      setIngredientsWithImages(ingredientsWithImages);
    };

    getIngredientsWithImages();
  }, [cocktail]);

  const getIngredientImage = async (ingredientName) => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/images/ingredients/${ingredientName}.png`);
      if (response.ok) {
        return { uri: `https://www.thecocktaildb.com/images/ingredients/${ingredientName}.png` };
      }
    } catch (error) {
      console.error('Error fetching ingredient image:', error);
    }
    // Fallback image or handle error
    return require('../assets/erreur.jpg');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.cocktailImage} />
      <Text style={styles.cocktailName}>{cocktail.strDrink}</Text>
      <Text style={styles.cocktailCategory}>Category: {cocktail.strCategory}</Text>
      <Text style={styles.cocktailInstructions}>Instructions: {cocktail.strInstructions}</Text>

      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsTitle}>Ingredients:</Text>
        <View>
          {ingredientsWithImages.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Image source={ingredient.image} style={styles.ingredientImage} />
              <Text style={styles.ingredientText}>{`${ingredient.name}: ${ingredient.measure}`}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cocktailImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
  },
  cocktailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  cocktailCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cocktailInstructions: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  ingredientsContainer: {
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    textAlign: 'center',
  },
  ingredientImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    alignSelf: 'center',
  },
  ingredientText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailsPage;
