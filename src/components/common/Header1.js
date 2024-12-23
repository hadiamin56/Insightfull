// Navbar.js

import React, { useState } from "react";
import { FaBars, FaAngleDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const showDropdown = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const hideDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <div>
      {/* Navbar for small screens */}
      <nav className="lg:hidden p-4 shadow-md z-50 ">
        <div className="container mx-auto flex justify-between items-center z-50">
          <img src="assets/1.jpg" className="w-[150px]" alt="Logo"></img>
          <div className="z-50">
            <button
              onClick={toggleNavbar}
              className="text-black focus:outline-none z-50"
            >
              {isOpen ? (
                <RxCross1 className="h-6 w-6 text-black" />
              ) : (
                <FaBars className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>
      </nav>

{/* Navbar for larger screens */}
<nav className="hidden lg:flex p-4 shadow-md items-center justify-center z-50 bg-green-600">
  <div className="container flex items-center justify-center z-50">
    <img src="assets/1.jpg" className="w-[150px] rounded-md shadow-md shadow-green-500" alt="Logo"></img>

    <div className="text-2xl lg:flex-grow  md:relative md:ml-[600px] p-2 font-roboto z-50  ">
      <a
        href="#"
        className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4 no-underline text-[16px]"
      >
        Home
      </a>

      <div className="relative inline-block text-left">
        <a
          href="#"
          onMouseEnter={() => showDropdown("industries")}
          onMouseLeave={hideDropdown}
          className="mt-4 lg:inline-block lg:mt-0 text-white mr-4 no-underline cursor-pointer text-[16px]"
        >
          Industries
          <FaAngleDown className="ml-2 inline-block" />
        </a>
        {activeDropdown === "industries" && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Petrochemicals
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 text-[16px]"
              >
                Medicine
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="relative inline-block text-left">
        <a
          href="#"
          onMouseEnter={() => showDropdown("services")}
          onMouseLeave={hideDropdown}
          className="mt-4 lg:inline-block lg:mt-0 text-white  no-underline cursor-pointer text-[16px]"
        >
          Services
          <FaAngleDown className="ml-2 inline-block" />
        </a>
        {activeDropdown === "services" && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Consultancy
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Reports
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Add "Join Us" with "Login" and "Signup" links */}
      <div className="relative inline-block text-left ml-3">
        <a
          href="#"
          onMouseEnter={() => showDropdown("joinUs")}
          onMouseLeave={hideDropdown}
          className="mt-4 lg:inline-block lg:mt-0 text-white no-underline cursor-pointer text-[16px]"
        >
          Join Us
          <FaAngleDown className="ml-2 inline-block" />
        </a>
        {activeDropdown === "joinUs" && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Login
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
              >
                Signup
              </a>
            </div>
          </div>
        )}
      </div>
      
    </div>
  </div>
</nav>


      {/* Display menu items outside the navbar when toggled */}
      {isOpen && (
        <div className="lg:hidden text-white p-4 shadow-md flex flex-col w-full bg-green-600 ml-auto z-50 ">
          <a href="#" className="block mt-4 no-underline">
            Home
          </a>
          <div className="relative inline-block text-left">
            <a
              href="#"
              onMouseEnter={() => showDropdown("industries")}
              onMouseLeave={hideDropdown}
              className="mt-4 no-underline cursor-pointer text-[14px]"
            >
              Industries
              <FaAngleDown className="ml-2 inline-block" />
            </a>
            {activeDropdown === "industries" && (
              <div className="bg-green-600 p-2 ">
                <a href="#" className="block mt-2 no-underline text-[14px]">
                  Petrochemicals
                </a>
                <a href="#" className="block mt-2 no-underline text-[14px]">
                  Medicine
                </a>
              </div>
            )}
          </div>
          <div className="relative inline-block text-left">
            <a
              href="#"
              onMouseEnter={() => showDropdown("services")}
              onMouseLeave={hideDropdown}
              className="mt-4 no-underline cursor-pointer"
            >
              Services
              <FaAngleDown className="ml-2 inline-block" />
            </a>
            {activeDropdown === "services" && (
              <div className="bg-green-600 p-2 shadow-md">
                <a href="#" className="block mt-2 no-underline">
                  Consultancy
                </a>
                <a href="#" className="block mt-2 no-underline">
                  Reports
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const myComponentStyle = {
  fontFamily: "Pacifico",
};

export default Navbar;
