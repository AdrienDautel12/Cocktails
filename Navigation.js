import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NavigationBar = ({ navigateToCocktails, navigateToFavorites }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToCocktails} style={styles.iconContainer}>
        <MaterialIcons name="list" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToFavorites} style={styles.iconContainer}>
        <MaterialIcons name="favorite" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 20,
  },
  iconContainer: {
    padding: 10,
  },
});

export default NavigationBar;
