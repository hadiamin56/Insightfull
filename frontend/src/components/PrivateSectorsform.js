import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./common/Header";
import {
  FaTrashAlt,
  FaUpload,
  FaCheck,
  FaExclamationCircle,
} from "react-icons/fa";

const PrivateSectorForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/PrivateSectorDetails"
        );
        setSectors(response.data);
      } catch (err) {
        setError("Failed to load sectors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      setErrorMessage("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/PrivateSectors",
        formData
      );

      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setTitle("");
      setDescription("");
      setImage(null);

      const updatedSectors = await axios.get(
        "http://localhost:5000/api/admin/PrivateSectorDetails"
      );
      setSectors(updatedSectors.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setSuccessMessage("");
    }
  };

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

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">
          Private Sectors Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Image:
            </label>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaUpload className="ml-2 text-blue-500 text-lg" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        {errorMessage && (
          <p className="mt-4 text-red-500 text-center flex items-center justify-center">
            <FaExclamationCircle className="mr-2 text-xl" />
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="mt-4 text-green-500 text-center flex items-center justify-center">
            <FaCheck className="mr-2 text-xl" />
            {successMessage}
          </p>
        )}

<div className="mt-8">
  {loading ? (
    <div className="text-gray-500 text-center">Loading...</div>
  ) : error ? (
    <div className="text-red-500 text-center">{error}</div>
  ) : (
    <div className="overflow-hidden">
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-lg table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">Title</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">Image</th>
            <th className="px-6 py-4 text-left font-semibold text-gray-700">Description</th>
            <th className="px-6 py-4 text-center font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sectors.map((sector) => (
            <tr key={sector.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-800">
                <div className="h-full flex items-center">{sector.title}</div>
              </td>
              <td className="px-6 py-4">
                <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
                  <img
                    src={`http://localhost:5000/${sector.image.replace(/\\/g, "/")}`}
                    alt="Sector"
                    className="w-full h-full object-cover rounded-lg shadow-md border border-gray-200"
                  />
                </div>
              </td>
              <td className="px-6 py-4 text-gray-700">
                <div className="h-full flex items-center">{sector.description}</div>
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => handleDelete(sector.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg shadow-md flex items-center space-x-2"
                >
                  <FaTrashAlt /> <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default PrivateSectorForm;
