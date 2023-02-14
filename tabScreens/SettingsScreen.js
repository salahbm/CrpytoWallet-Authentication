import React, {useContext} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {NetworkContext} from '../ethers/Networks';
import {ethers} from 'ethers';
import {Data} from '../App';
const SettingsScreen = ({navigation}) => {
  const {handleLogout, wallet} = useContext(Data);
  const {network, toggleNetwork, netColor} = useContext(NetworkContext);
  const connection = new ethers.providers.JsonRpcProvider(
    'https://eth-goerli.g.alchemy.com/v2/NmShLyLunzQEWmshUdHRDRRWReqIhmAR',
  );

  async function sendTransaction() {
    // console.log(wallet);

    // Sua/ccess code

    const gasPrice = await connection.getGasPrice();
    const signer = new ethers.Wallet(wallet.privateKey);
    const tx = {
      from: '0x94Ca3834dA61b871016504200B78304cBea13D5b',
      to: '0xcC47683Be51eBD6E2b090A7f2B013C9bBa328F13',
      value: ethers.utils.parseUnits('0.01', 'ether'),
      gasPrice: gasPrice,
      // gasPrice: ethers.utils.hexlify(20000000000),
      gasLimit: ethers.utils.hexlify(100000),
      nonce: await connection.getTransactionCount(wallet?.address, 'latest'),
    };

    const signed = await signer.signTransaction(tx);
    const transaction = await connection.sendTransaction(signed);

    console.log('pending');
    // const pending = await transaction.wait();

    console.log('Succesfully sent');
  }

  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Settings</Text>

      <TouchableOpacity onPress={sendTransaction}>
        <Text style={{color: 'green'}}>send</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{color: 'red'}}>log out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleNetwork}>
        <Text style={{color: 'yellow'}}>toggleNetwork</Text>
      </TouchableOpacity>
      <Text style={{color: netColor}}>{network}</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 30,
  },
});
