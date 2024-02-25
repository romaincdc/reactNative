import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import FavoritePage from './components/FavoritePage';
import { FavoritesProvider } from './components/FavoritesContext'; 
import { createStackNavigator } from '@react-navigation/stack';
import DetailsPage from './components/DetailsPage';
import Icon from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Accueil" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsPage} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <FavoritesProvider>  
      <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Favori"
          component={FavoritePage}
          options={{
            tabBarLabel: 'Favori',
            tabBarIcon: ({ color, size }) => (
              <Icon name="heart" color={color} size={size} />
            ),
          }}
        />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
