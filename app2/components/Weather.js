import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function WeatherComponent({ weather }) {
  return (
    <View style={styles.WeatherContainer}>
      <Text style={styles.LocationText}>{weather.name}</Text>
      <Text style={styles.TemperatureText}>{weather.main.temp} °C</Text>
      <Text style={styles.DescriptionText}>{weather.weather[0].description}</Text>
      <Text style={styles.LocationText}>humidity : {weather.main.humidity} %</Text>
      <Image
        source={{ uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png` }}
        style={{ width: 50, height: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
 WeatherContainer : {
  marginTop: 20,
  alignItems: "center",
},

 LocationText : {
  fontSize: 24,
  color: "#fff",
  marginBottom: 10,
 },

 TemperatureText : {
  fontSize: 56,
  color: "#fff",
 },

 DescriptionText : {
  fontSize: 18,
  color: "#fff",
 },
});