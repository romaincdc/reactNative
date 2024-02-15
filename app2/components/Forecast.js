// components/Forecast.js
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function ForecastComponent({ forecast }) {
  return (
    <FlatList
      data={forecast.list}
      keyExtractor={(item) => item.dt.toString()}
      renderItem={({ item }) => (
        <View styles={styles.ForecastContainer}>
          <Text style={styles.ForecastText}>Date : {item.dt_txt}</Text>
          <Text style={styles.ForecastText}>Temperature : {item.main.temp} °C</Text>
          <Text style={styles.ForecastDescription}>Description : {item.weather[0].description}</Text>
          <Text style={styles.ForecastText}>Humidité : {item.main.humidity} %</Text>
          <Text style={styles.ForecastText}>Vitesse du vent : {item.wind.speed} m/s</Text>
          <Image
            source={{ uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png` }}
            style={{ width: 50, height: 50 }}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({

 ForecastContainer : {
  marginTop: 20,
  alignItems: "center",
},

ForecastItem :{
  marginBottom: 10,
  alignItems: "center",
},

ForecastText: {
  fontSize: 18,
  color: "#fff",
},

ForecastDescription : {
  fontSize: 14,
  color: "#fff",
},
});