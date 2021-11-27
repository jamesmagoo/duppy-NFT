import React, { Fragment, useEffect, useState } from 'react';
import Button from './Button';
import Footer from './Footer';

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
        <div className='pt-36 pb-12'>
          <p className='text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
            The NFT Collection
          </p>
          <p className='text-lg font-normal italic'>Random word mash NFT's</p>
        </div>
        {currentAccount === '' ? (
          renderNotConnectedContainer()
        ) : (
          <Button onClick={null} title='Mint NFT' />
        )}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Splash;
