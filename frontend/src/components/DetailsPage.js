import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./common/Header";
import { ChatAlt2Icon, OfficeBuildingIcon, PhotographIcon, UploadIcon, CollectionIcon, BellIcon, AcademicCapIcon } from '@heroicons/react/outline';

const DetailsPage = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "User Queries", description: "View and manage user queries.", color: "bg-blue-600", route: "/queries", icon: <ChatAlt2Icon className="h-6 w-6 mr-2" /> },
    { title: "Update Practice Sector", description: "View and add Practice Sector.", color: "bg-green-600", route: "/PracticeSector", icon: <OfficeBuildingIcon className="h-6 w-6 mr-2" /> },
    { title: "Slider Images", description: "View, add, and manage slider images.", color: "bg-purple-600", route: "/SliderImagesForm", icon: <PhotographIcon className="h-6 w-6 mr-2" /> },
    { title: "Upload Result", description: "Upload and manage results for users.", color: "bg-red-600", route: "/UploadResultForm", icon: <UploadIcon className="h-6 w-6 mr-2" /> },
    { title: "Upload Gallery", description: "Upload and manage images in the gallery.", color: "bg-teal-600", route: "/MultipleImageUploadForm", icon: <CollectionIcon className="h-6 w-6 mr-2" /> },
    { title: "Add Notification", description: "Add and manage notifications.", color: "bg-yellow-600", route: "/NotificationForm", icon: <BellIcon className="h-6 w-6 mr-2" /> },
    { title: "Student Leaderboard", description: "Update and manage student leaderboard.", color: "bg-indigo-600", route: "/LeaderboardForm", icon: <AcademicCapIcon className="h-6 w-6 mr-2" /> }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Dashboard</h2>

          {/* Cards for Admin Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`cursor-pointer ${card.color} text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all transform`}
                onClick={() => handleCardClick(card.route)}
              >
                <div className="flex items-center">
                  {/* Icon and Title */}
                  <div className="flex items-center text-l font-semibold">
                    {card.icon}
                    {card.title}
                  </div>
                </div>
                {/* Description below the title */}
                <p className="mt-2 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
