import React from 'react';
import { Link } from 'react-router-dom';

const Floki = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Link to='/taleb'>
    <div>
        <p className='text-lg italic'>
          "What I need from you Floki are your ideas, for they are worth more
          than gold and silver, and they come from the gods"
        </p>
    </div>
    </Link>
    </div>
  )
}

export default Floki ;
