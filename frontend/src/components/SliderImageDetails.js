import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./common/Header";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SliderImageDetails = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/getSliderImages"
        );
        console.log("API Response:", response.data); // Log response
        if (Array.isArray(response.data)) {
          setImages(response.data); // Use data as-is for debugging
        } else {
          setError("Unexpected data structure from API.");
        }
      } catch (err) {
        console.error("Error fetching images:", err); // Log error
        setError("Failed to load images. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/deleteSliderImage/${id}` // Adjusted API endpoint
      );
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

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
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Slider Images
        </h1>

        {images.length === 0 ? (
          <div className="text-gray-600 text-center text-lg mt-8">
            No images found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image?.id || Math.random()} // Fallback for missing id
                  className="border p-4 rounded-lg shadow-md"
                >
                  {image.image_url ? (
                    <img
                      src={`http://localhost:5000/${image.image_url}`}
                      alt="Slider"
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      No image available
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      onClick={() => image?.id && handleDelete(image.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-md flex items-center space-x-2 transition duration-150 ease-in-out"
                    >
                      <FaTrashAlt className="w-5 h-5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/SliderImagesform")}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg shadow-md flex items-center space-x-2 transition duration-150 ease-in-out"
          >
            <span>Add New Image</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderImageDetails;
