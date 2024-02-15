// components/Location.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

export default function LocationComponent({ onLocationChange }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      onLocationChange(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  return (
    <View>
      {errorMsg && <Text>{errorMsg}</Text>}
      
    </View>
  );
}
