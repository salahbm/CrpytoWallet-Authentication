import React, {useState, useContext} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {NetworkContext} from '../ethers/Networks';
import {ethers} from 'ethers';
import {Data} from '../App';
const TransactionScreen = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const {loggedInUser} = useContext(Data);
  const connection = new ethers.providers.JsonRpcProvider(
    'https://eth-goerli.g.alchemy.com/v2/NmShLyLunzQEWmshUdHRDRRWReqIhmAR',
  );

  console.log(loggedInUser);
  async function sendTransaction() {
    // Sua/ccess code

    const gasPrice = await connection.getGasPrice();
    const signer = new ethers.Wallet(loggedInUser.privateKey);
    const tx = {
      from: loggedInUser?.address,
      to: receiver,
      value: ethers.utils.parseUnits(amount, 'ether'),
      gasPrice: gasPrice,
      // gasPrice: ethers.utils.hexlify(20000000000),
      gasLimit: ethers.utils.hexlify(100000),
      nonce: await connection.getTransactionCount(
        loggedInUser?.address,
        'latest',
      ),
    };

    const signed = await signer.signTransaction(tx);
    const transaction = await connection.sendTransaction(signed);

    console.log('pending');
    // const pending = await transaction.wait();

    console.log('Succesfully sent');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text
          ellipsizeMode="middle"
          numberOfLines={1}
          style={{
            fontSize: 16,
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#e3e3e3',
            paddingVertical: 5,
          }}>
          {loggedInUser?.address}
        </Text>
        <TextInput
          placeholder="To"
          value={receiver}
          onChangeText={setReceiver}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />
      </View>
      <Button title="Send" onPress={sendTransaction} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingVertical: 5,
  },
  button: {
    backgroundColor: '#2d9cdb',
    color: 'white',
    borderRadius: 8,
    paddingVertical: 15,
  },
});

export default TransactionScreen;
