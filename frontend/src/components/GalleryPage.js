import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./common/Header";
import { AiFillCompass } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/imagesGallery");
        if (Array.isArray(response.data.images)) {
          setImages(response.data.images);
        } else {
          setError("Unexpected data structure from API.");
        }
      } catch (err) {
        setError("Failed to load images. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Open modal with the clicked image
  };

  const closeModal = () => {
    setSelectedImage(null); // Close modal
  };

  const handleSearchIconClick = (e, imageUrl) => {
    e.stopPropagation(); // Prevent the click event from propagating to the image container
    setSelectedImage(imageUrl); // Open modal with the clicked image from the search icon
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
          Image Gallery
        </h1>

        {images.length === 0 ? (
          <div className="text-gray-600 text-center text-lg mt-8">
            No images found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              >
                <img
                  src={image.image_url}
                  alt="Gallery"
                  className="w-full h-64 object-cover rounded-lg transition duration-500 ease-in-out transform hover:scale-110"
                  onClick={() => handleImageClick(image.image_url)}
                />
                {/* Search Icon */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 hover:opacity-100 transition duration-300 z-10"
                  onClick={(e) => handleSearchIconClick(e, image.image_url)}
                >
                  <AiFillCompass className="text-white text-3xl" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal to view larger image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-6 rounded-lg max-w-3xl w-full cursor-pointer"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full transition"
            >
              <AiFillCloseCircle className="text-white text-3xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
