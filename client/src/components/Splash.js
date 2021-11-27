import React, { Fragment, useEffect, useState } from 'react';
import Button from './Button';
import Footer from './Footer';
import { ethers } from 'ethers';
import DuppyABI from '../utils/DuppyABI.json';

const Splash = () => {
  const [currentAccount, setCurrentAccount] = useState('');

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
      console.log('We have the ethereum object', ethereum);
    }
    //Check if we're authorized to access the user's wallet
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    //User can have multiple authorized accounts, we grab the first one if its there!
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account:', account);
      setCurrentAccount(account);
    } else {
      console.log('No authorized account found');
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get Bloody Metamask');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const mintNFT = async () => {
    const CONTRACT_ADDRESS = '0xE7825368D5D3cCBD85200382A09734202b866632';
    const contractABI = DuppyABI.abi;

    try {
      // get the ethereum object
      const { ethereum } = window;
      if (ethereum) {
        // initialise a provider
        const provider = new ethers.providers.Web3Provider(ethereum);
        // get the signer
        const signer = provider.getSigner();
        // create an instance of the contract to interact with
        const duppyNFT = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI,
          signer
        );

        // make calls to mint NFT
        console.log('Going to pop wallet now to pay gas...');
        let nftTxn = await duppyNFT.makeAnEpicNFT();

        console.log('Mining...please wait.');
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`

        );
      } else {
        console.log('No ethereum object');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Render Methods
  const renderNotConnectedContainer = () => (
    <div className='py-10'>
      <Button title='Connect Wallet' onClick={connectWallet} />
    </div>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <Fragment>
      <div className='flex flex-col justify-start items-center h-screen'>
        <div className='pt-36 pb-12 items-center'>
          <p className='text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
            The NFT Collection
          </p>
          <div className='flex justify-center'>
            <p className='text-lg font-normal italic'>
              🎭 Random word mash NFT's 🌀
            </p>
          </div>
        </div>
        {currentAccount === '' ? (
          renderNotConnectedContainer()
        ) : (
          <Button onClick={mintNFT} title='Mint NFT' />
        )}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Splash;
