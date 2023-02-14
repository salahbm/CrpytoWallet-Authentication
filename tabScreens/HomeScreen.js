import React, {useContext} from 'react';
import {Data} from '../App';
import {View, Text, StyleSheet} from 'react-native';

const HomeScreen = () => {
  const {loggedInUser, totalCoin, tokenUSD} = useContext(Data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Home</Text>
        <Text style={styles.headerText}>Activity</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Username</Text>
        </View>
        <Text style={styles.value}>{loggedInUser?.username}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Wallet Address</Text>
        </View>
        <Text
          ellipsizeMode="middle"
          numberOfLines={1}
          style={styles.valueAddress}>
          {loggedInUser?.address}
        </Text>
      </View>
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Wallet Balance</Text>
        </View>
        <Text style={styles.value}>${tokenUSD}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Total Coin</Text>
        </View>
        <Text style={styles.value}>{totalCoin} ETH</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 16,
    color: '#007AFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  labelContainer: {
    marginEnd: 10,
    width: 150,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#007AFF',
  },
  valueAddress: {
    fontSize: 16,
    color: 'green',
    width: 150,
  },
});

export default HomeScreen;
