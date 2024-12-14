import React from "react";
import { useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const navigate = useNavigate(); // For navigating to the user queries page

  const handleCardClick = (card) => {
    if (card === "userQueries") {
      navigate("/user-queries"); // Redirect to the user queries table page
    } else {
      navigate("/sample"); // Redirect to sample page, you can add more functionality in the future
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Dashboard</h2>
        
        {/* Cards for User Queries and Sample */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            className="cursor-pointer bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            onClick={() => handleCardClick("userQueries")}
          >
            <h3 className="text-xl font-semibold">User Queries</h3>
            <p className="mt-2 text-sm">View and manage user queries.</p>
          </div>

          <div
            className="cursor-pointer bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
            onClick={() => handleCardClick("sample")}
          >
            <h3 className="text-xl font-semibold">Sample</h3>
            <p className="mt-2 text-sm">A sample card for future use.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
