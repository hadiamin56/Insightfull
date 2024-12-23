import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./common/Header";

const DetailsPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    if (card === "userQueries") {
      navigate("/queries");
    } else if (card === "sliderImages") {
      navigate("/SliderImagesForm"); // Navigate to Slider Images Management Page
    } else if (card === "uploadResult") {
      navigate("/UploadResultForm"); // Navigate to Upload Result Page
    } else if (card === "uploadGallery") {
      navigate("/MultipleImageUploadForm"); // Navigate to Upload Gallery Page
    } else if (card === "addNotification") {
      navigate("/NotificationForm"); // Navigate to Notification Form Page
    } else {
      navigate("/PrivateSectorsform");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Dashboard</h2>

          {/* Cards for Admin Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* User Queries */}
            <div
              className="cursor-pointer bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
              onClick={() => handleCardClick("userQueries")}
            >
              <h3 className="text-xl font-semibold">User Queries</h3>
              <p className="mt-2 text-sm">View and manage user queries.</p>
            </div>

            {/* Update Practice Sector */}
            <div
              className="cursor-pointer bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
              onClick={() => handleCardClick("sample")}
            >
              <h3 className="text-xl font-semibold">Update Practice Sector</h3>
              <p className="mt-2 text-sm">View and add Practice Sector.</p>
            </div>

            {/* Slider Images */}
            <div
              className="cursor-pointer bg-purple-600 text-white p-6 rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
              onClick={() => handleCardClick("sliderImages")}
            >
              <h3 className="text-xl font-semibold">Slider Images</h3>
              <p className="mt-2 text-sm">View, add, and manage slider images.</p>
            </div>

            {/* Upload Result */}
            <div
              className="cursor-pointer bg-red-600 text-white p-6 rounded-lg shadow-lg hover:bg-red-700 transition-colors"
              onClick={() => handleCardClick("uploadResult")}
            >
              <h3 className="text-xl font-semibold">Upload Result</h3>
              <p className="mt-2 text-sm">Upload and manage results for users.</p>
            </div>

            {/* Upload Gallery */}
            <div
              className="cursor-pointer bg-teal-600 text-white p-6 rounded-lg shadow-lg hover:bg-teal-700 transition-colors"
              onClick={() => handleCardClick("uploadGallery")}
            >
              <h3 className="text-xl font-semibold">Upload Gallery</h3>
              <p className="mt-2 text-sm">Upload and manage images in the gallery.</p>
            </div>

            {/* Add Notification */}
            <div
              className="cursor-pointer bg-yellow-600 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-700 transition-colors"
              onClick={() => handleCardClick("addNotification")}
            >
              <h3 className="text-xl font-semibold">Add Notification</h3>
              <p className="mt-2 text-sm">Add and manage notifications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
