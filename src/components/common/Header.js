import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaChevronDown, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaSearch, FaUserCircle } from "react-icons/fa"; // Import social media and user icon
import SubHeader from "./SubHeader"; // Import the SubHeader component

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [downloadsDropdownOpen, setDownloadsDropdownOpen] = useState(false); // State for Downloads dropdown
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false); // State for Account dropdown
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  const aboutDropdownRef = useRef(null);
  const downloadsDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null); // Reference for account dropdown

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleDownloadsDropdown = () => setDownloadsDropdownOpen(!downloadsDropdownOpen);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        aboutDropdownRef.current && 
        !aboutDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
      if (
        downloadsDropdownRef.current && 
        !downloadsDropdownRef.current.contains(event.target)
      ) {
        setDownloadsDropdownOpen(false);
      }
      if (
        accountDropdownRef.current && 
        !accountDropdownRef.current.contains(event.target)
      ) {
        setAccountDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Check session status on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/session",
          { withCredentials: true }
        );
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      navigate("/Login"); // Redirect to login page after logout
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleAccountDropdownToggle = (e) => {
    e.stopPropagation(); // Prevent click from propagating to the parent
    setAccountDropdownOpen(!accountDropdownOpen);
    setDropdownOpen(false); // Close other dropdowns when account dropdown is opened
  };

  return (
    <>
      <SubHeader />
      {/* Main Header */}
      <header className="z-10 mt-2">
        <div className="flex h-[90px] items-center justify-between px-4 lg:px-0 rubik-subtitles">
          {/* Logo and Subtitle */}
          <div className="lg:ml-[90px] flex items-center space-x-4">
            <img src="assets/logo.jpg" className="h-[80px]" alt="Logo" />
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex lg:items-center lg:mr-[100px] space-x-8 z-5">
            <Link to="/" className="hover:text-[#1A8F60]">Home</Link>

            {/* About Us Dropdown */}
            <div className="relative" ref={aboutDropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 hover:text-[#1A8F60]"
              >
                <span>About Us</span>
                <FaChevronDown
                  className={`text-m transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute bg-white shadow-lg mt-2 w-[500px] rounded-lg border z-20 flex">
                  <div className="p-4 w-1/2 bg-green-800 text-white rounded-l-lg flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-2">About Our School</h3>
                    <p>
                      We are dedicated to providing the best solutions for our clients.
                      Explore our services and insights to learn more about our expertise.
                    </p>
                  </div>
                  <div className="w-1/2 flex flex-col justify-center">
                    <Link to="/Consulting" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Consulting</Link>
                    <Link to="/reportandsubs" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Reports and Subscriptions</Link>
                    <Link to="/Insights" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Insights</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Downloads Dropdown */}
            <div className="relative" ref={downloadsDropdownRef}>
              <button
                onClick={toggleDownloadsDropdown}
                className="flex items-center space-x-1 hover:text-[#1A8F60]"
              >
                <span>Downloads</span>
                <FaChevronDown
                  className={`text-m transition-transform duration-300 ${downloadsDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {downloadsDropdownOpen && (
                <div className="absolute bg-white shadow-lg mt-2 w-[500px] rounded-lg border z-20 flex">
                  <div className="p-4 w-1/2 bg-green-800 text-white rounded-l-lg flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-2">Download Resources</h3>
                    <p>
                      Access our latest reports, results, and resources.
                      Stay updated with our downloads section.
                    </p>
                  </div>
                  <div className="w-1/2 flex flex-col justify-center">
                    <Link to="/Results" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Results</Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/ViewGallery" className="hover:text-[#1A8F60]">Gallery</Link>
            <Link to="/Industries" className="hover:text-[#1A8F60]">Industries</Link>
            <Link to="/contactus" className="hover:text-[#1A8F60]">Contact</Link>

            {/* User Dropdown for Dashboard and Logout */}
            {isLoggedIn && (
              <div className="relative" ref={accountDropdownRef}>
                <button
                  className="flex items-center space-x-2 text-[#1A8F60]"
                  onClick={handleAccountDropdownToggle}
                >
                  <FaUserCircle className="text-xl" />
                  <span>Admin</span>
                </button>
                {accountDropdownOpen && (
                  <div className="absolute bg-white shadow-lg mt-2 py-2 w-48 rounded-lg border z-20">
                    <Link to="/details" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Login Button when not logged in */}
            {!isLoggedIn && (
              <Link to="/login" className="text-[#1A8F60] hover:underline">Login</Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};
