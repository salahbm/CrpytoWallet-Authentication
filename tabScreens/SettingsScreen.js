import React, {useContext} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {NetworkContext} from '../ethers/Networks';
import {ethers} from 'ethers';
import {Data} from '../App';
const SettingsScreen = ({navigation}) => {
  const {handleLogout, wallet} = useContext(Data);
  const {network, toggleNetwork, netColor} = useContext(NetworkContext);

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Security</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Change Password</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Two-Factor Authentication</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>PIN Settings</Text>
        </View>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Support</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Contact Us</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>FAQs</Text>
        </View>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>General</Text>
        <TouchableOpacity onPress={toggleNetwork} style={styles.option}>
          <Text style={styles.optionText}>Network</Text>
          <Text style={[styles.optionSubtext, {color: netColor}]}>
            {network}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.option}>
          <Text style={[styles.optionText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  optionContainer: {
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#000000',
  },
  optionSubtext: {
    fontSize: 14,
    color: '#007AFF',
  },
  logoutText: {
    color: '#FF4D4D',
  },
});

export default SettingsScreen;
