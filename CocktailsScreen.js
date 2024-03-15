import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function CocktailsScreen() {
  const [cocktails, setCocktails] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleFavorite = (idDrink) => {
    if (favorites.includes(idDrink)) {
      setFavorites(favorites.filter(item => item !== idDrink));
    } else {
      setFavorites([...favorites, idDrink]);
    }
  };

  const openModal = (cocktail) => {
    setSelectedCocktail(cocktail);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchCocktails = async (letter) => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
        const data = await response.json();
        return data.drinks || [];
      } catch (error) {
        console.error(`Erreur lors de la récupération des cocktails commençant par ${letter} :`, error);
        return [];
      }
    };

    const fetchAllCocktails = async () => {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const cocktailsByLetter = await Promise.all(alphabet.split('').map(async letter => {
        const drinks = await fetchCocktails(letter);
        return { letter, drinks };
      }));
      setCocktails(cocktailsByLetter);
    };

    fetchAllCocktails();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <Text style={styles.sectionTitle}>{item.letter ? item.letter.toUpperCase() : 'N/A'}</Text>
            <FlatList
              data={item.drinks}
              keyExtractor={(drink) => drink.idDrink}
              renderItem={({ item: drink }) => (
                <TouchableOpacity onPress={() => openModal(drink)}>
                  <View style={styles.cocktailContainer}>
                    <TouchableOpacity onPress={() => toggleFavorite(drink.idDrink)} style={styles.favoriteIcon}>
                      <MaterialIcons
                        name={favorites.includes(drink.idDrink) ? 'favorite' : 'favorite-border'}
                        size={24}
                        color={favorites.includes(drink.idDrink) ? 'red' : 'black'}
                      />
                    </TouchableOpacity>
                    <Text style={styles.cocktailName}>{drink.strDrink}</Text>
                    <Image source={{ uri: drink.strDrinkThumb }} style={styles.image} />
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.cocktailName}>{selectedCocktail?.strDrink}</Text>
            <Text style={styles.cocktailInstructions}>{selectedCocktail?.strInstructions}</Text>
            <Button title="Fermer" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cocktailContainer: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
    width:350,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    position: 'relative',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cocktailName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cocktailInstructions: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
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
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default CocktailsScreen;
