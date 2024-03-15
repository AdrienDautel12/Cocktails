import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FavoriteScreen = ({ route }) => {
  const { favorites } = route.params; 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des favoris</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.cocktailName}>{item.strDrink}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  cocktailName: {
    fontSize: 16,
  },
});

export default FavoriteScreen;
