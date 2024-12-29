import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "./common/Header";
import {
  FaUpload,
  FaCheck,
  FaExclamationCircle,
  FaTrashAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axios from "axios";

const SliderImagesForm = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [images, setImages] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/getSliderImages"
        );
        const processedImages = response.data.map((image) => ({
          ...image,
          image_url: `http://localhost:5000/${image.image_url}`,
        }));
        setImages(processedImages);
      } catch (err) {
        setErrorMessage("Failed to load images. Please try again.");
      }
    };
    fetchImages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      setErrorMessage("Image is required.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/uploadSliderImage",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image.");
      }
      setSuccessMessage(data.message);
      setImages([
        { id: data.image.id, image_url: `http://localhost:5000/${data.image.image_url}` },
        ...images,
      ]);
      setImage(null);
      setPreview(null);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/deleteSliderImage/${id}`
      );
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-center">
          <nav className="text-sm font-medium text-gray-600 inline-block">
            <ol className="list-reset flex justify-center">
              <li>
                <Link
                  to="/Details"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-500">Slider Images</li>
            </ol>
          </nav>
        </div>

        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Manage Slider Images
        </h1>

        {/* Upload Form */}
        <div className="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-xl font-medium mb-4">Upload New Image</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:outline-none w-full"
              />
              <FaUpload className="text-blue-500 text-lg" />
            </div>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 rounded-lg shadow-sm w-full max-h-40 object-cover"
              />
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Upload Image
            </button>
          </form>
          {errorMessage && (
            <p className="mt-4 text-red-500 flex items-center">
              <FaExclamationCircle className="mr-2 text-lg" /> {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="mt-4 text-green-500 flex items-center">
              <FaCheck className="mr-2 text-lg" /> {successMessage}
            </p>
          )}
        </div>

        {/* View Images Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Uploaded Images</h2>
            <button
              onClick={toggleDetails}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              {isDetailsOpen ? (
                <FaEyeSlash className="text-lg" />
              ) : (
                <FaEye className="text-lg" />
              )}
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all ${
              isDetailsOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            {images.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No images found.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="border p-4 rounded-lg shadow-sm bg-white"
                  >
                    <img
                      src={image.image_url}
                      alt="Slider"
                      className="rounded-lg mb-4 w-full h-32 object-cover"
                    />
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      <FaTrashAlt className="inline mr-2" /> Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderImagesForm;
