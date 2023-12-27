import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/register-login/LoginScreen';
import RegisterScreen from './src/screens/register-login/RegisterScreen';
import HomeScreen from './src/screens/main/HomeScreen';
import GiftScreen from './src/screens/main/GiftScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name='GiftScreen' component={GiftScreen}/>
    
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;