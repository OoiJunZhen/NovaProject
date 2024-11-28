import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './MainPage';
import BuyScreen from './BuyScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="BuyScreen" component={BuyScreen} options={{ title: 'BUY' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
