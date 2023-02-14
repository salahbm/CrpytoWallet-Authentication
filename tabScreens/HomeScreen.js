import React, {useContext} from 'react';
import {Data} from '../App';
import {View, Text, StyleSheet} from 'react-native';
const HomeScreen = () => {
  const {loggedInUser, totalCoin, tokenUSD} = useContext(Data);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>HomeScreen UI</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{loggedInUser?.username}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Wallet Address:</Text>
        <Text
          ellipsizeMode="middle"
          numberOfLines={1}
          style={styles.value_address}>
          {loggedInUser?.address}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Wallet Balance:</Text>
        <Text style={styles.value}>${tokenUSD} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Coin:</Text>
        <Text style={styles.value}>{totalCoin}ETH</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  value: {
    fontSize: 18,
    color: '#fff',
  },
  value_address: {
    fontSize: 18,
    color: '#fff',
    width: 100,
  },
});
