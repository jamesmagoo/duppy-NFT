import React from 'react';
import { Link } from 'react-router-dom';

const Taleb = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Link to='/'>
        <div>
          <p className='text-lg italic px-10'>
            "There is no word for it in Romance languages; in Arabic it is
            called Shhm—best translated as nonsmall. If you take risks and face
            your fate with dignity, there is nothing you can do that makes you
            small; if you don’t take risks, there is nothing you can do that
            makes you grand, nothing. And when you take risks, insults by
            half-men (small men, those who don’t risk anything) are similar to
            barks by nonhuman animals: you can’t feel insulted by a dog."
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Taleb;
