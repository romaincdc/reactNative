import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ObjectifItem = ({ item, onDelete, onEdit }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [nouvelObjectif, setNouvelObjectif] = useState(item);

  const handleEdit = () => {
    onEdit(nouvelObjectif);
    setModalVisible(false);
  };

  return (
    <View style={styles.objectifItem}>
      <Text>{item}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editButton}>
          <Icon name="edit" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Icon name="times" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={nouvelObjectif}
              onChangeText={(text) => setNouvelObjectif(text)}
            />
            <TouchableOpacity onPress={handleEdit} style={styles.saveButton}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  objectifItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: 'green',
    borderRadius: 15,
    padding: 10,
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 10,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: 'gray',
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

export default ObjectifItem;
