import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

import WalletScreen from './walletScreen';
const Stack = createStackNavigator();

const AthenticationStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerMode: 'none', headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
    </Stack.Navigator>
  );
};

export default AthenticationStack;
