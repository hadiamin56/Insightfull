import React, { useState, useEffect } from "react";
import axios from "axios";

export const PracticeSectors = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/PrivateSectorDetails"
        );
        if (response.data) {
          setSectors(response.data);
        } else {
          setError("No data returned from server.");
        }
      } catch (err) {
        setError("Failed to load sectors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sectors.map((sector, index) => (
          <div
            key={sector.id || index}
            className="group relative overflow-hidden bg-white rounded-3xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            {/* Image Section */}
            <div className="w-full h-64 relative">
              <img
                src={
                  sector.image
                    ? `http://localhost:5000/${sector.image.replace(/\\/g, "/")}`
                    : "assets/practice.jpg" // Fallback image if none is provided
                }
                className="object-cover w-full h-full transition-all duration-300 group-hover:opacity-80"
                alt={sector.title || "Sector"}
              />
              {/* Overlay for better contrast */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-30"></div>
            </div>

            {/* Card Content */}
            <div className="p-6 relative z-10">
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-4">
                {sector.title || "N/A"}
              </h2>
              <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors mb-6">
                {sector.description || "No description available."}
              </p>
              <a
                href="#"
                className="inline-block text-blue-500 font-semibold hover:text-blue-700 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
