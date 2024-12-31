import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Axios for API calls
import { FaSearch } from 'react-icons/fa';

export const SlideInfo = () => {
  const [images, setImages] = useState([]); // Dynamic images from API
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://insightfull-backend.vercel.app/api/admin/getSliderImages');
        if (Array.isArray(response.data)) {
          const imageUrls = response.data.map((item) => `https://insightfull-backend.vercel.app/${item.image_url}`);
          setImages(imageUrls);
        } else {
          setError('Unexpected data structure from API.');
        }
      } catch (err) {
        console.error('Error fetching slider images:', err);
        setError('Failed to load images. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // Auto-slide effect
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(nextImage, 6000);
      return () => clearInterval(interval);
    }
  }, [nextImage, images.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Hero Image or Video */}
      <div
        className="w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: images.length
            ? `url(${images[currentImageIndex]})`
            : `url('default-placeholder-image.jpg')`, // Fallback if no images
        }}
      ></div>

      {/* Overlay for text */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 py-8">
          <h1 className="text-[40px] lg:text-[60px] font-bold leading-tight rubik-slideinfotext">
            First-Class Business <br />
            Consultant
          </h1>
          <p className="mt-4 text-sm lg:text-base xl:text-lg rubik-subtitles">
            We know how large objects will act, but things on a <br />
            small scale just do not act that way.
          </p>
          <div className="flex justify-center mt-6 gap-4">
            <button className="px-6 py-3 bg-[#006951] text-white rounded-full text-lg shadow-lg hover:bg-[#004c39]">
              Get Quote Now
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-full text-lg hover:bg-[#006951] hover:text-white">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 0 && (
        <>
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 z-20"
          >
            &#10094;
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 z-20"
          >
            &#10095;
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-gray-500'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};
