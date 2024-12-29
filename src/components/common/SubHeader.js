import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaSearch } from "react-icons/fa"; // Social icons

const SubHeader = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      onSearch(searchQuery); // Call the passed function with the search query
    }
  };

  return (
    <div className="bg-[#f1f1f1] py-1 text-center">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
        
        {/* Left Side: Search Bar */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1 rounded-l-md border text-sm w-48" // Adjusted width of input
            placeholder="Search..."
          />
          <button
            onClick={handleSearch}
            className="bg-[#1A8F60] text-white h-[32px] px-3 py-1 rounded-r-md text-sm flex items-center justify-center" // Adjusted button size
          >
            <FaSearch className="text-sm" /> {/* Smaller icon */}
          </button>
        </div>

        {/* Center: Call Us and Other Options */}
        <div className="flex space-x-6 text-sm">
          <span className="text-gray-700">Contact Us</span>
          <span className="text-gray-700">Fee Circular</span>
          {/* <span className="text-gray-700">Pay Fee Online</span> */}
          {/* <span className="text-gray-700">Campus Manager</span> */}
          <span className="text-gray-700">Alumni</span>
          <span className="text-gray-700">Support</span>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="flex space-x-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-[#1A8F60] hover:text-[#1072a4] text-lg" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-[#1A8F60] hover:text-[#1da1f2] text-lg" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-[#1A8F60] hover:text-[#e4405f] text-lg" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-[#1A8F60] hover:text-[#0a66c2] text-lg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
