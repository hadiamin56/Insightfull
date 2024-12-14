import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Importing useNavigate for redirection

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [queries, setQueries] = useState([]);
  const navigate = useNavigate(); // Using navigate to redirect

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://sql7.freemysqlhosting.net/api/admin/login", {
        username,
        password,
      });

      if (response.data.message === "Login successful") {
        setMessage("Login successful! Fetching user queries...");
        fetchUserQueries();
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "An error occurred");
    }
  };

  const fetchUserQueries = async () => {
    try {
      const response = await axios.get("https://sql7.freemysqlhosting.net/api/admin/user-queries");
      setQueries(response.data);
      // After fetching the data, redirect to the details page
      navigate("/details"); // Redirect to the details page
    } catch (err) {
      setMessage(err.response?.data?.error || "An error occurred while fetching queries");
    }
  };

  return (
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
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
