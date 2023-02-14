import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
const WalletScreen = ({navigation}) => {
  useEffect(() => {
    async function getWalletData() {
      const wallet = await AsyncStorage.getItem('loggedInUser');
      console.log(wallet);
    }
    getWalletData();
  }, []);
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text>LogIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalletScreen;
