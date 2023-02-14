import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '@ethersproject/shims';
// Import the ethers library
import {ethers} from 'ethers';
const RegisterScreen = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const storeData = async () => {
    try {
      const wallet = ethers.Wallet.createRandom();

      const user = {
        username: username,
        password: password,
        privateKey: wallet.privateKey,
        address: wallet.address,
        mnemonic: wallet._mnemonic().phrase,
      };
      const users = await AsyncStorage.getItem('users');
      let parsedUsers = [];
      if (users) {
        parsedUsers = JSON.parse(users);
      }
      parsedUsers.push(user);
      await AsyncStorage.setItem('users', JSON.stringify(parsedUsers));

      const saved = await AsyncStorage.getItem('users');
      console.log(JSON.parse(saved));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigation.navigate('WalletScreen');
    }
  };
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <ActivityIndicator size="large" color={'white'} />
        <Text style={{textAlign: 'center', color: 'white'}}>
          Please wait up to 30 secs {'\n'}to create a new wallet
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <TextInput
        value={username}
        onChangeText={text => setUserName(text)}
        placeholder="username"
        style={{
          marginBottom: 10,
          paddingHorizontal: 5,
          paddingVertical: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: 'gray',
          width: '80%',
          color: 'black',
        }}
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry
        style={{
          marginBottom: 10,
          paddingHorizontal: 5,
          paddingVertical: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: 'gray',
          width: '80%',
          color: 'black',
        }}
      />
      <Button
        onPress={() => {
          setIsLoading(true);
          storeData();
        }}
        title="Register"
        color="green"
      />
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text style={{color: 'gray', fontSize: 14}}>I have wallet</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{color: 'blue', fontSize: 14, marginLeft: 5}}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
      {/* {isLoading && (
        <View style={{marginTop: 20}}>
          <ActivityIndicator size="large" color={'black'} />
          <Text style={{textAlign: 'center', color: 'black'}}>
            Please wait up to 30 secs {'\n'}to create a new wallet
          </Text>
        </View>
      )} */}
    </View>
  );
};

export default RegisterScreen;
