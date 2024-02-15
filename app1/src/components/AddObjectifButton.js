import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';

const AddObjectifButton = ({ onPress }) => (
  <Ripple style={styles.addButton} rippleColor="#fff" rippleOpacity={0.6} onPress={onPress}>
    <Text style={styles.buttonText}>Add</Text>
  </Ripple>
);

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default AddObjectifButton;
