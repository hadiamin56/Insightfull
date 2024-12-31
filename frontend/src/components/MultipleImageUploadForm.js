import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { Header } from "./common/Header";

const MultipleImageUploadForm = () => {
  const [images, setImages] = useState([]); // To hold selected images for upload
  const [imageTitles, setImageTitles] = useState([]); // To hold titles of images
  const [eventTitles, setEventTitles] = useState([]); // To hold event titles
  const [dates, setDates] = useState([]); // To hold event dates
  const [eventDescriptions, setEventDescriptions] = useState([]); // To hold event descriptions
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [galleryImages, setGalleryImages] = useState([]); // To hold images fetched from the server
  const [isOpen, setIsOpen] = useState(false); // To manage the collapsible state of the gallery

  // Filter state for selecting image type (Event, Image, Video)
  const [filter, setFilter] = useState("All");

  // Handle image file changes
  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(files);

    // Initialize the titles array with a default value for each image
    setImageTitles(Array(files.length).fill("Event")); // Default title is 'Event'
    setEventTitles(Array(files.length).fill("")); // Default event title is empty
    setDates(Array(files.length).fill("")); // Default date is empty
    setEventDescriptions(Array(files.length).fill("")); // Default event description is empty
  };

  // Handle title change for each image
  const handleTitleChange = (index, value) => {
    const newTitles = [...imageTitles];
    newTitles[index] = value;
    setImageTitles(newTitles);
  };

  // Handle event title, date, and description change
  const handleEventTitleChange = (index, value) => {
    const newEventTitles = [...eventTitles];
    newEventTitles[index] = value;
    setEventTitles(newEventTitles);
  };

  const handleDateChange = (index, value) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const handleEventDescriptionChange = (index, value) => {
    const newEventDescriptions = [...eventDescriptions];
    newEventDescriptions[index] = value;
    setEventDescriptions(newEventDescriptions);
  };

  // Handle form submission to upload images
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setUploadError("At least one image is required.");
      return;
    }

    // Ensure all images have a title selected
    if (imageTitles.some((title) => title === "")) {
      setUploadError("Each image must have a title.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
      formData.append("image_titles[]", imageTitles[i]); // Add image titles to the form data
      formData.append("event_titles[]", eventTitles[i]); // Add event titles
      formData.append("dates[]", dates[i]); // Add event dates
      formData.append("event_descriptions[]", eventDescriptions[i]); // Add event descriptions
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
      setImageTitles([]);
      setEventTitles([]);
      setDates([]);
      setEventDescriptions([]);
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

  // Filter the images based on the selected filter
  const filteredImages = galleryImages.filter((image) => {
    if (filter === "All") return true;
    return image.image_title === filter;
  });

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-center">
          <nav className="text-sm font-medium text-gray-600 inline-block">
            <ol className="list-reset flex justify-center">
              <li>
                <a
                  href="/Details"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-500">Gallery</li>
            </ol>
          </nav>
        </div>
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

          {/* Input for image titles */}
          {images.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Image Titles:</label>
              {Array.from({ length: images.length }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <select
                    value={imageTitles[index]}
                    onChange={(e) => handleTitleChange(index, e.target.value)}
                    className="w-full px-4 py-2 border rounded-md shadow-sm"
                    required
                  >
                    <option value="Event">Event</option>
                    <option value="Images">Images</option>
                    <option value="Video">Video</option>
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* Conditionally render Event-specific fields */}
          {images.length > 0 &&
            imageTitles.map((title, index) => title === "Event" && (
              <div key={index}>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Event Title:</label>
                  <input
                    type="text"
                    value={eventTitles[index]}
                    onChange={(e) => handleEventTitleChange(index, e.target.value)}
                    className="w-full px-4 py-2 border rounded-md shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Event Date:</label>
                  <input
                    type="date"
                    value={dates[index]}
                    onChange={(e) => handleDateChange(index, e.target.value)}
                    className="w-full px-4 py-2 border rounded-md shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Event Description:</label>
                  <textarea
                    value={eventDescriptions[index]}
                    onChange={(e) => handleEventDescriptionChange(index, e.target.value)}
                    className="w-full px-4 py-2 border rounded-md shadow-sm"
                  />
                </div>
              </div>
            ))}
          
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Upload Images
          </button>
        </form>

        {/* Error and Success Messages */}
        {uploadError && (
          <div className="mt-4 text-red-600 text-sm">{uploadError}</div>
        )}
        {uploadSuccess && (
          <div className="mt-4 text-green-600 text-sm">{uploadSuccess}</div>
        )}

        {/* Filter Section */}
        <div className="mt-6 mb-4">
          <label className="block text-sm font-medium text-gray-600">Filter by Type:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          >
            <option value="All">All</option>
            <option value="Event">Event</option>
            <option value="Images">Images</option>
            <option value="Video">Video</option>
          </select>
        </div>

        {/* Gallery Section */}
        <div className="mt-6">
          <button
            onClick={toggleGallery}
            className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {isOpen ? "Hide" : "Show"} Gallery
          </button>
          {isOpen && (
            <div className="mt-4 space-y-4">
              {filteredImages.map((image) => (
                <div key={image.id} className="flex items-center space-x-4">
                  <img
                    src={image.image_url}
                    alt={image.image_title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{image.image_title}</p>
                    {image.image_title === "Event" && (
                      <>
                        <p className="text-sm text-gray-600"><b>Event Title:</b> {image.event_title}</p>
                        <p className="text-sm text-gray-600"><b>Event Date:</b> {image.date ? new Date(image.date).toLocaleDateString() : "N/A"}</p>
                        <p className="text-sm text-gray-600"><b>Event Description: </b>{image.event_description}</p>
                      </>
                    )}
                  </div>
                  <AiFillDelete
                    onClick={() => handleDelete(image.id)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultipleImageUploadForm;
