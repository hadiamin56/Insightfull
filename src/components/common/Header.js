import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className=' '>
      <div className='flex h-[90px] items-center justify-between px-4 lg:px-0 '>
        <div className='lg:ml-[200px]  '> 
          <img src='assets/1.jpg' className='h-[80px]' alt='Logo'/>
         <p className='-mt-4 leading-tight ml-5 text-[11px] font-bold text-[#1A8F60]'>TheInsightful, the Chemicals and<br></br> Fertilizers Advisory Company</p>
        </div>
        <div className='lg:hidden'>
          <button onClick={toggleMenu} className='focus:outline-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {menuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              )}
            </svg>
          </button>
        </div>
        <div className='hidden lg:flex lg:items-center lg:mr-[500px] z-5 '>
          <div className='lg:flex lg:gap-6'>
            <div>Home</div>
            <div>Services</div>
            <div>Join us</div>
            <Link to="/contact-us">Contact</Link>
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <div className='bg-white py-4 px-4 z-5'>
          <div>Home</div>
          <div>Services</div>
          <div>Join us</div>
          <div>Contact</div>
        </div>
      </div>
    </div>
  );
};
