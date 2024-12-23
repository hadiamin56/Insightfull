import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./common/Header";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const PrivateSectors = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/PrivateSectorDetails/${id}`
      );
      setSectors(sectors.filter((sector) => sector.id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // const handleUpdate = (id) => {
  //   console.log("Update sector with ID:", id);
  // };

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
    <div className="min-h-scree">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Private Sectors
        </h1>

        {sectors.length === 0 ? (
          <div className="text-gray-600 text-center text-lg mt-8">
            No sectors found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sectors.map((sector, index) => (
                  <tr
                    key={sector.id || index}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-gray-800">
                      {sector.title || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {sector.image ? (
                        <img
                          src={`http://localhost:5000/${sector.image.replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt="Sector"
                          className="w-20 h-20 rounded-lg shadow-md object-cover border border-gray-200"
                        />
                      ) : (
                        <span className="text-gray-600">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {sector.description || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center flex items-center justify-center space-x-4">
                      {/* <button
                        onClick={() => handleUpdate(sector.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md flex items-center space-x-2 transition duration-150 ease-in-out"
                      >
                        <FaEdit className="w-5 h-5" />
                        <span>Update</span>
                      </button> */}
                      <button
                        onClick={() => handleDelete(sector.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-md flex items-center space-x-2 transition duration-150 ease-in-out"
                      >
                        <FaTrashAlt className="w-5 h-5" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/PrivateSectorsform")} // Use navigate to redirect
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center space-x-2 transition duration-150 ease-in-out"
          >
            <FaPlus className="w-5 h-5" />
            <span>Add New Private Sector</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivateSectors;
