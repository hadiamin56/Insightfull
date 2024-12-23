import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa"; // Import the icon

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [downloadsDropdownOpen, setDownloadsDropdownOpen] = useState(false); // State for Downloads dropdown
  const navigate = useNavigate();
  const aboutDropdownRef = useRef(null);
  const downloadsDropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleDownloadsDropdown = () =>
    setDownloadsDropdownOpen(!downloadsDropdownOpen);

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
          {
            withCredentials: true,
          }
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

  return (
    <header className="z-10 mt-2">
      <div className="flex h-[90px] items-center justify-between px-4 lg:px-0 rubik-subtitles">
        {/* Logo and Subtitle */}
        <div className="lg:ml-[90px] flex items-center space-x-4">
          <img src="assets/1.jpg" className="h-[80px]" alt="Logo" />
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex lg:items-center lg:mr-[100px] space-x-8 z-5">
          <Link to="/" className="hover:text-[#1A8F60]">
            Home
          </Link>

          {/* About Us Dropdown */}
          <div className="relative" ref={aboutDropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 hover:text-[#1A8F60]"
            >
              <span>About Us</span>
              <FaChevronDown
                className={`text-m transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white shadow-lg mt-2 py-2 w-48 rounded-lg border z-20">
                <Link
                  to="/Consulting"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Consulting
                </Link>
                <Link
                  to="/reportandsubs"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Reports and Subscriptions
                </Link>
                <Link
                  to="/Insights"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Insights
                </Link>
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
                className={`text-m transition-transform duration-300 ${
                  downloadsDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {downloadsDropdownOpen && (
              <div className="absolute bg-white shadow-lg mt-2 py-2 w-48 rounded-lg border z-20">
                <Link
                  to="/Results"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Results
                </Link>
              </div>
            )}
          </div>

          <Link to="/ViewGallery" className="hover:text-[#1A8F60]">
            Gallery
          </Link>
          <Link to="/Industries" className="hover:text-[#1A8F60]">
            Industries
          </Link>
          <Link to="/contactus" className="hover:text-[#1A8F60]">
            Contact
          </Link>
          {isLoggedIn && (
            <Link to="/details" className="hover:text-[#1A8F60]">
              Dashboard
            </Link>
          )}

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-[#1A8F60] hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
