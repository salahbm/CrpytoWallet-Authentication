import React, {createContext, useEffect, useState, useCallback} from 'react';
import Tabs from './navigation/tabs';
import {View, ActivityIndicator} from 'react-native';
import AthenticationStack from './athentication/authenticationStack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ethers} from 'ethers';
import NetworkProvider from './ethers/Networks';
export const Data = createContext();
import {NetworkContext} from './ethers/Networks';
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [totalCoin, setTotalCoin] = useState(0);
  const [tokenUSD, setTokenUSD] = useState(0);
  const [provider, setProvider] = useState(
    new ethers.providers.StaticJsonRpcProvider(
      'https://eth-goerli.g.alchemy.com/v2/9fNSQ8sQ7nVqaeqeZeK5ELbs7mW-R3gA',
    ),
  );
  console.log(loggedInUser);
  useEffect(() => {
    // Check if there's a logged-in user
    const checkLoggedInUser = async () => {
      try {
        const user = await AsyncStorage.getItem('loggedInUser');
        if (user) {
          setLoggedInUser(JSON.parse(user));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoggedInUser();
  }, []);
  const handleLogin = async () => {
    try {
      const users = await AsyncStorage.getItem('users');
      let parsedUsers = [];
      if (users) {
        parsedUsers = JSON.parse(users);
      }
      const user = parsedUsers.find(
        user => user.username === username && user.password === password,
      );
      if (user) {
        // change the stack if user is available

        await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
        setLoggedInUser(user);

        // Clear the username and password fields
        setUserName('');
        setPassword('');
      } else {
        console.log('Incorrect username or password');
      }
    } catch (error) {
      console.log(error);
    }
  };
  //log out logic

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem('loggedInUser');
    //to delete all the data in storage
    // await AsyncStorage.removeItem('users');
    setLoggedInUser(null);
  }, []);

  useEffect(() => {
    async function getBalance() {
      const balance = (
        await provider.getBalance(loggedInUser?.address)
      ).toString();
      const formatted = ethers.utils.formatUnits(balance, 'ether');
      setTotalCoin(formatted);
      const exchangeRate = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
      )
        .then(response => response.json())
        .then(data => data.ethereum.usd);
      const balanceInUSD = (totalCoin * exchangeRate).toFixed(4);
      setTokenUSD(balanceInUSD);
    }

    if (loggedInUser) {
      getBalance();
    }
  }, [loggedInUser, provider, totalCoin, tokenUSD]);

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
      </View>
    );
  }
  return (
    <NetworkProvider>
      <Data.Provider
        value={{
          handleLogout,
          tokenUSD,
          totalCoin,
          loggedInUser,
          handleLogin,
          setUserName,
          setPassword,
          username,
          password,
        }}>
        <NavigationContainer>
          {loggedInUser !== null ? <Tabs /> : <AthenticationStack />}
        </NavigationContainer>
      </Data.Provider>
    </NetworkProvider>
  );
};

export default App;
