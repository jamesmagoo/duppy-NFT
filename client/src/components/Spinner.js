import React, { Fragment } from 'react';
import spinner from '../assets/Eth_loading.gif';

const Spinner = () => {
  return (
    <Fragment>
      <div className=''>
        <img
          src={spinner}
          alt='Loading...'
          style={{ width: '64px', margin: 'auto', display: 'block' }}
        />
      </div>
    </Fragment>
  );
};

export default Spinner;
