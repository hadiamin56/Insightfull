import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserGraduate, FaAward, FaSchool, FaBuilding, FaMedal, FaUsers } from "react-icons/fa";

// Utility function to capitalize the first letter of each word
const capitalizeName = (name) => {
  return name
    .split(" ") // Split the name by spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Rejoin the words
};

const LeaderboardCards = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/LeaderboardDetails"
        );
        setLeaderboard(response.data);
      } catch (err) {
        setError("Failed to load leaderboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  // Loading state
  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading leaderboard...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-10">
        Student Leaderboard
      </h1>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {leaderboard.map((student, index) => (
          <div
            key={student.student_id}
            className="relative bg-white backdrop-blur-lg bg-opacity-90 shadow-lg rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Ribbon for Rank */}
          {/* Badge Icon (Instead of Rank) */}
          <div className="absolute top-1 right-1 flex space-x-2">
              {/* Badge icon to replace rank */}
              <span className="bg-green-900 text-white text-m font-semibold px-3 py-1 rounded-3xl shadow-md">
                <FaMedal className="inline-block " />
              </span>
            </div>

            {/* Avatar */}
            <div className="flex justify-center">
              <img
                src={`http://localhost:5000/${student.student_image.replace(/\\/g, "/")}`}
                alt={student.student_name}
                className="w-24 h-24 object-cover rounded-full border-4 border-blue-200 shadow-md"
              />
            </div>

            {/* Student Info */}
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-gray-800 flex justify-center items-center mb-1">
                <FaUserGraduate className="mr-2 text-blue-500" />
                {capitalizeName(student.student_name)}
              </h2>

              <p className="text-gray-600 text-sm flex items-center justify-center mb-1">
                <FaSchool className="mr-2 text-green-500" /> Class: {student.class} - {student.section}
              </p>

              <p className="text-gray-600 text-sm flex items-center justify-center mb-1">
                <FaAward className="mr-2 text-yellow-500" /> {student.title}
              </p>

              <p className="text-gray-600 text-sm flex items-center justify-center">
                <FaBuilding className="mr-2 text-purple-500" /> {student.department}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardCards;
