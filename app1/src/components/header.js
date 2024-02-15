import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Header;
