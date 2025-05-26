import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './Screens/MainMenu';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainMenu" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainMenu" component={MainMenu} />
                {/* Agrega aquí otras pantallas si las necesitas */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}