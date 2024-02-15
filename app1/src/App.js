import React, { useState } from "react";
import {
  View,
  ImageBackground,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import Header from "./components/header";
import ObjectifItem from "./components/ObjectifItem";


export default function App() {
  const [objectifs, setObjectifs] = useState([
    "Atteindre et maintenir un poids sain",
    "Faire de l'exercice régulièrement",
    "Adopter une alimentation équilibrée",
    "Pratiquer la méditation quotidienne",
    "Établir une routine de sommeil régulière",
    "Apprendre à gérer le stress et l'anxiété",
  ]);

  const [nouvelObjectif, setNouvelObjectif] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedObjectif, setEditedObjectif] = useState('');

  const ajouterObjectif = () => {
    if (nouvelObjectif.trim() !== "") {
      setObjectifs([...objectifs, nouvelObjectif]);
      setNouvelObjectif("");
      setModalVisible(false);
    }
  };

  const supprimerObjectif = (index) => {
    const nouveauxObjectifs = [...objectifs];
    nouveauxObjectifs.splice(index, 1);
    setObjectifs(nouveauxObjectifs);
  };

  const renderObjectif = ({ item, index }) => (
    <ObjectifItem item={item} onDelete={() => supprimerObjectif(index)} />
  );

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Header title="Objectifs de vie" />

        <FlatList
          data={objectifs}
          renderItem={({ item, index }) => (
            <ObjectifItem
              item={item}
              onDelete={() => supprimerObjectif(index)}
              onEdit={(nouvelObjectif) => handleEdit(index, nouvelObjectif)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ajouter un nouvel objectif"
            value={nouvelObjectif}
            onChangeText={(text) => setNouvelObjectif(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={ajouterObjectif}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  objectifItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
});
