import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    
    <div className=' z-5 mt-2 '>
      <div className='flex h-[90px] items-center justify-between px-4 lg:px-0  rubik-subtitles'>
        <div className='lg:ml-[90px]  '> 
          <img src='assets/1.jpg' className='h-[80px]' alt='Logo'/>
         <p className='-mt-4 leading-tight ml-5 text-[11px] font-bold text-[#1A8F60] rubik-subtitles'>The Chemicals and Fertilizers <br></br> Advisory Company</p>
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
        <div className='hidden lg:flex lg:items-center lg:mr-[300px] z-5 '>
          <div className='lg:flex lg:gap-6'>
            <Link to="/">Home</Link>
            <div className="relative z-20" onBlur={closeDropdown}>
              <span onClick={toggleDropdown}>Services</span>
              {dropdownOpen && (
                <div className="absolute bg-white shadow-lg mt-2 py-2 w-48 rounded-lg border" onMouseLeave={closeDropdown}>
                  <Link to="/Consulting" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Consulting</Link>
                  <Link to="/reportandsubs" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Reports and Subscriptions</Link>
                  <Link to="/Insights" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Insights</Link>
                </div>
              )}
            </div>
            
            <Link to ="/Joinus">Join Us</Link>
            <Link to="/Industries">Industries</Link>
            <Link to="/contactus">Contact</Link>
          </div>
        </div>
      </div>
    <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'}`}>
  <div className='lg:bg-white bg-[#006951] py-4 px-4 z-5 mt-2 text-white font-bold '>
  
    <div className="text-center mb-4">
    <div className="text-center mb-4">Home</div>
      <span className="inline-block relative z-20" onBlur={closeDropdown}>
        <span onClick={toggleDropdown}>Services</span>
        {dropdownOpen && (
          <div className="absolute bg-white shadow-lg mt-2 py-2 w-48 rounded-lg border" onMouseLeave={closeDropdown}>
            <Link to="/Consulting" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Consulting</Link>
            <Link to="/reportandsubs" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Reports and Subscriptions</Link>
            <Link to="/Insights" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Insights</Link>
          </div>
        )}
      </span>
    </div>

            <Link to ="/Joinus" className="text-center mb-4">Join Us</Link>
            <Link to="/Industries" className="text-center mb-4">Industries</Link>
    
    <div className="text-center">
      <Link to="/contactus">Contact</Link>
    </div>
  </div>
</div>

    </div>
  );
};
