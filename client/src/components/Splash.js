import React, { Fragment } from 'react';
import Button from './Button';

const Splash = () => {
  return (
    <Fragment>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div>
          <p className='text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>The NFT Collection</p>
          <p className='text-lg font-normal italic'>Random word mash NFT's</p>
        </div>
        <div className='pt-10'>
          <Button title='Connect Wallet' />
        </div>
      </div>
    </Fragment>
  );
};

export default Splash;
