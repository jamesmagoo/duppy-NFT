import React from 'react';

const Button = (props) => {
  return (
    <div>
      <button
        onClick={props.onClick}
        className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 uppercase font-bold transform h-8 w-32 text-sm md:text-lg md:h-16 md:w-64 md:px-10 rounded-lg hover:font-black hover:shadow-2xl hover:-translate-y-0.5 my-2 sm:my-4'
      >
        {props.title}
      </button>
    </div>
  );
};

export default Button;
