import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from '../Screens/MainMenu';
import CreateSurvey from '../Screens/CreateSurvey';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Inicio' }} />
        <Stack.Screen name="CreateSurvey" component={CreateSurvey} options={{ title: 'Crear Encuesta' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
