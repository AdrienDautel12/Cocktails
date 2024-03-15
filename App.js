// Dans App.js
import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CocktailsScreen from './CocktailsScreen';
import Favorite from './Favorite';
import NavigationBar from './Navigation'; 
const Stack = createNativeStackNavigator();

function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CocktailsScreen">
        <Stack.Screen 
          name="CocktailsScreen" 
          initialParams={{ favorites: favorites, setFavorites: setFavorites }} 
          component={CocktailsScreen} 
        />
        <Stack.Screen 
          name="Favorite" 
          component={Favorite} 
        />
      </Stack.Navigator>
      <NavigationBar 
        navigateToCocktails={() => navigation.navigate('CocktailsScreen')} 
        navigateToFavorites={() => navigation.navigate('Favorite')} 
      />
    </NavigationContainer>
  );
}

export default App;
