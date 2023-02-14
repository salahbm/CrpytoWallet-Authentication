import React, {createContext, useEffect, useState, useContext} from 'react';
import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Data} from '../App';
const LoginScreen = ({navigation}) => {
  // const [username, setUserName] = useState('');
  // const [password, setPassword] = useState('');

  // const [loggedInUser, setLoggedInUser] = useState(null);
  // useEffect(() => {
  //   // Check if there's a logged-in user
  //   const checkLoggedInUser = async () => {
  //     try {
  //       const user = await AsyncStorage.getItem('loggedInUser');
  //       if (user) {
  //         setLoggedInUser(JSON.parse(user));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   checkLoggedInUser();
  // }, []);
  // const handleLogin = async () => {
  //   try {
  //     const users = await AsyncStorage.getItem('users');
  //     let parsedUsers = [];
  //     if (users) {
  //       parsedUsers = JSON.parse(users);
  //     }
  //     const user = parsedUsers.find(
  //       user => user.username === username && user.password === password,
  //     );
  //     if (user) {
  //       // change the stack if user is available
  //       navigation.replace('Tabs', {loggedInUser});
  //       await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
  //       setLoggedInUser(user);
  //       // Clear the username and password fields
  //       setUserName('');
  //       setPassword('');
  //     } else {
  //       console.log('Incorrect username or password');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const {handleLogin, setUserName, setPassword, username, password} =
    useContext(Data);
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
          textAlign: 'center',
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
          textAlign: 'center',
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
      <Button onPress={handleLogin} title="Login" color="green" />
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text style={{color: 'gray', fontSize: 14}}>Don't have wallet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={{color: 'blue', fontSize: 14, marginLeft: 5}}>
            Create new
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
