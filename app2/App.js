import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator,StyleSheet,Platform } from 'react-native';
import LocationComponent from './components/Location';
import WeatherComponent from './components/Weather';
import ForecastComponent from './components/Forecast';


export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const apiKey = 'd9fd8ad55390f8b5450573afd60b2e7e';
      
      
      const weatherResponse = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${apiKey}`
      );
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      
      const forecastResponse = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${apiKey}`
      );
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      setLoading(true);
      fetchWeatherData(location.latitude, location.longitude);
      
    }
  }, [location]);

  return (
    <View style={styles.Container}>

          <LocationComponent onLocationChange={(lat, lon) => setLocation({ latitude: lat, longitude: lon })} />
          {weather && <WeatherComponent weather={weather} />}
          {forecast && <ForecastComponent forecast={forecast} />}
        
      
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#4a90e2",
  paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight + 20,
},

 LoadingContainer:{
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

 LoadingText :{
  fontSize: 18,
  color: "#fff",
 },
});
