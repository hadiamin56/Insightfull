import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./common/Header";
import { FaUpload, FaCheck, FaExclamationCircle, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const SliderImagesForm = () => {
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [images, setImages] = useState([]); // To store uploaded images
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // To toggle the details section
  const navigate = useNavigate();

  // Fetch the images when the component loads
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/getSliderImages");
        if (Array.isArray(response.data)) {
          setImages(response.data); // Store the fetched images
        } else {
          setErrorMessage("Unexpected data structure from API.");
        }
      } catch (err) {
        setErrorMessage("Failed to load images. Please try again.");
      }
    };

    fetchImages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!images) {
      setErrorMessage("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("image", images);

    try {
      const response = await fetch("http://localhost:5000/api/admin/uploadSliderImage", {
        method: "POST",
        body: formData,
        credentials: "include", // Ensure cookies or credentials are sent
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccessMessage(data.message);
      setErrorMessage("");
      setImage(null); // Clear the selected image after successful upload

      // Assuming the backend returns the full image URL in data.image.image_url
      const newImage = data.image;

      if (newImage && newImage.image_url) {
        // Construct the full image URL
        const fullImageUrl = `http://localhost:5000/${newImage.image_url}`;

        // Immediately add the new image to the images list (this triggers a re-render)
        setImages((prevImages) => [{ id: newImage.id, image_url: fullImageUrl }, ...prevImages]);
      }

    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteSliderImage/${id}`);
      setImages(images.filter((image) => image.id !== id)); // Remove the deleted image from the list
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">Slider Image Upload</h1>

        {/* Image upload form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-600">
              Image:
            </label>
            <div className="flex items-center">
              <input
                type="file"
                id="image"
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
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
          >
            Submit
          </button>
        </form>

        {/* Success/Error Messages */}
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

        {/* Toggle Button for Details */}
        <div className="mt-6 text-center">
          <button
            onClick={toggleDetails}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {isDetailsOpen ? "Close Slider Images" : "View Slider Images"}
          </button>
        </div>

        {/* Collapsible Image Details Section */}
        {isDetailsOpen && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Uploaded Slider Images</h2>

            {images.length === 0 ? (
              <div className="text-gray-600 text-center text-lg mt-8">
                No images found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div
                    key={image?.id || Math.random()} 
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
                          onClick={() => handleDelete(image.id)}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderImagesForm;
