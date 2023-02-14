import React, {createContext, useState} from 'react';
import {ethers} from 'ethers';

export const NetworkContext = createContext();

const NetworkProvider = ({children}) => {
  const [network, setNetwork] = useState('Mainnet');
  const [provider, setProvider] = useState(
    new ethers.providers.StaticJsonRpcProvider(
      'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
    ),
  );
  const [netColor, setNetColor] = useState('green');

  // function to toggle the network
  const toggleNetwork = () => {
    if (network === 'Mainnet') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://eth-goerli.g.alchemy.com/v2/9fNSQ8sQ7nVqaeqeZeK5ELbs7mW-R3gA',
        ),
      );
      setNetwork('Goerli');
      setNetColor('orange');
    } else if (network === 'Goerli') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://polygon-mumbai.g.alchemy.com/v2/lDL61yz-2Ys5pmxneawlm9GKUwGwRgyW',
        ),
      );
      setNetwork('Polygon');
      setNetColor('blue');
    } else if (network === 'Polygon') {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://opt-goerli.g.alchemy.com/v2/wWoEinTD6ok4yN7n5ff5wPi4eUIYF4ET',
        ),
      );
      setNetwork('Optimism');
      setNetColor('red');
    } else {
      setProvider(
        new ethers.providers.StaticJsonRpcProvider(
          'https://eth-mainnet.g.alchemy.com/v2/JWDQNWpuTdABpcaT8qe5vdvEw7KPdl-T',
        ),
      );
      setNetwork('Mainnet');
      setNetColor('green');
    }
  };

  return (
    <NetworkContext.Provider
      value={{
        network,
        netColor,
        provider,
        toggleNetwork,
      }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
