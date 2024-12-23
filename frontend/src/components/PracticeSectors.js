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
    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-center gap-[40px] p-5">
      {sectors.map((sector, index) => (
        <div
          key={sector.id || index}
          className="flex flex-col md:flex-row gap-[50px] w-fit p-2"
        >
          <div className="shadow-md shadow-black-600 w-[232px]">
            <a href="#">
              <div className="flex flex-col px-6">
                <h2 className="text-md font-bold mt-5 rubik-maintitle">
                  {sector.title || "N/A"}
                </h2>
                <p className="text-sm mt-5 text-gray-600 rubik-subtitle">
                  {sector.description || "No description available."}
                </p>
              </div>
              <img
                src={
                  sector.image
                    ? `http://localhost:5000/${sector.image.replace(/\\/g, "/")}`
                    : "assets/practice.jpg" // Fallback image if none is provided
                }
                className="w-[230px] h-[138px] mt-5"
                alt={sector.title || "Sector"}
              />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
