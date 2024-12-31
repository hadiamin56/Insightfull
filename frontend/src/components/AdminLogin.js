import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from "./common/Header";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://insightfull-backend.vercel.app/api/admin/login",
        { username, password },
        { withCredentials: true } // Ensures cookies are sent for session handling
      );

      if (response.data.message === "Login successful") {
        setMessage("Login successful! Redirecting...");
        console.log("Admin Data:", response.data.admin);
        fetchUserQueries();
      } else {
        setMessage(response.data.message || "Unknown response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      // Handle errors gracefully
      if (err.response) {
        setMessage(err.response.data.message || "Error during login");
      } else if (err.request) {
        setMessage("Server not reachable. Check your connection.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  const fetchUserQueries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/queries", {
        withCredentials: true,
      });
      console.log("Fetched Queries:", response.data);
      navigate("/details");
    } catch (err) {
      console.error("Error fetching queries:", err);
      if (err.response) {
        setMessage(err.response.data.message || "Error fetching user queries");
      } else if (err.request) {
        setMessage("Server not reachable. Check your connection.");
      } else {
        setMessage("An unexpected error occurred while fetching queries.");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1A8F60] text-white py-2 px-4 rounded-md transition-colors hover:bg-[#166945]"
            >
              Login
            </button>
          </form>
          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
