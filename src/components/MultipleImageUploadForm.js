import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import {Header} from "./common/Header";
const MultipleImageUploadForm = () => {
  const [images, setImages] = useState([]); // To hold selected images for upload
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [galleryImages, setGalleryImages] = useState([]); // To hold images fetched from the server
  const [isOpen, setIsOpen] = useState(false); // To manage the collapsible state of the gallery

  // Handle image file changes
  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  // Handle form submission to upload images
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setUploadError("At least one image is required.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/uploadMultipleImages",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUploadSuccess(response.data.message);
      setUploadError("");
      setImages([]);
      fetchGalleryImages(); // Fetch gallery after successful upload
    } catch (error) {
      setUploadError(error.response?.data?.message || "Upload failed.");
      setUploadSuccess("");
    }
  };

  // Fetch gallery images from the server
  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/imagesGallery");
      setGalleryImages(response.data.images); // Assuming the response contains an array of image objects
    } catch (error) {
      setUploadError("Failed to fetch images.");
      setUploadSuccess("");
    }
  };

  // Handle delete image
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/deleteImage/${id}`);
      setUploadSuccess(response.data.message);
      setUploadError("");
      // Update gallery by filtering out the deleted image
      setGalleryImages((prevImages) => prevImages.filter((image) => image.id !== id));
    } catch (error) {
      setUploadError(error.response?.data?.message || "Failed to delete image.");
      setUploadSuccess("");
    }
  };

  // Fetch gallery images when the component mounts
  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // Toggle the collapsible gallery
  const toggleGallery = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Header/>
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
        Upload Multiple Images
      </h1>

      {/* Form for image upload */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Select Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload Images
        </button>
      </form>

      {/* Error and success messages */}
      {uploadError && <p className="mt-4 text-red-500 text-center">{uploadError}</p>}
      {uploadSuccess && <p className="mt-4 text-green-500 text-center">{uploadSuccess}</p>}

      {/* Collapsible Gallery Section */}
      <div className="mt-8">
       

        {/* Collapsible Toggle Button */}
        <button
          onClick={toggleGallery}
          className="w-full py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {isOpen ? "Collapse Gallery" : "Show Gallery"}
        </button>

        {/* Collapsible Gallery */}
        {isOpen && (
          <div className="mt-4 space-y-4">
            {galleryImages.length > 0 ? (
              galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={image.image_url}
                      alt={`Image ${image.id}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span>{`Image ${image.id}`}</span>
                  </div>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(image.id)} // Directly delete image on click
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <AiFillDelete />

                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No images found.</p>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default MultipleImageUploadForm;
