import React, { Fragment, useEffect, useState } from 'react';
import Button from './Button';
import Footer from './Footer';
import { ethers } from 'ethers';
import DuppyABI from '../utils/DuppyABI.json';
import Spinner from './Spinner'

const Splash = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [mining, setMining] = useState('');

  const CONTRACT_ADDRESS = '0x0AB097827C12Dd0A4506C1d44f85d3501e13209e';
  const contractABI = DuppyABI.abi;

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
      // initialise eventListener
      setupEventListener()

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

      // initialise eventListener
      setupEventListener()
    } catch (error) {
      console.log(error);
    }
  };

   // Setup our listener.
   const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
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

        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        duppyNFT.on("NFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const mintNFT = async () => {
  
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
        setMining(true);
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`

        );
        setMining(false);
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

  const renderMining = () => (
    <div>
      Mining...
      <Spinner/>
    </div>
  )

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

        {mining === true ? (
          renderMining()
        ) : (<div></div>
        )}
    
        <Footer />
      </div>
    </Fragment>
  );
};

export default Splash;
