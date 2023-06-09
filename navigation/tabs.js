import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../tabScreens/HomeScreen';
import SettingsScreen from '../tabScreens/SettingsScreen';
import TransactionScreen from '../tabScreens/TransactionScreen';
import {View, Text, StyleSheet} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tabs = () => {
  const Tab = createBottomTabNavigator();
  const colors = [(black = '	rgb(0,0,0)')];
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboardL: true,
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={styles.container}>
              <Feather name="home" color={colors.black} size={20} />
              <Text>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={styles.container}>
              <MaterialCommunityIcons
                name="swap-vertical-circle-outline"
                color={colors.black}
                size={20}
              />
              <Text>Transaction</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={styles.container}>
              <Feather name="settings" color={colors.black} size={20} />
              <Text>Settings</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
