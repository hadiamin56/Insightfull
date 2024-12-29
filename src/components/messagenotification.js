import React, { useState, useEffect } from "react";
import UpNotificationMarquee from "./UpNotificationMarquee";
const ManagementMessages = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const messages = [
    {
      title: "Message from Chairman",
      text: "As the Chairman, I am proud to welcome you to our esteemed institution. We are committed to providing a nurturing environment for academic excellence and personal growth. Our institution's success lies in its strong leadership, and we are dedicated to maintaining high standards.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.",
      img: "assets/1.jpg", // Replace with actual image URL for Chairman
    },
    {
      title: "Message from Principal",
      text: "I am honored to serve as the Principal of this dynamic institution. As the Chairman, I am proud to welcome you to our esteemed institution. We are committed to providing a nurturing environment for academic excellence and personal growth. Our institution's success lies in its strong leadership, and we are dedicated to maintaining high standards.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.",
      img: "assets/3.png", // Replace with actual image URL for Principal
    },
    {
      title: "Message from HOD",
      text: "As the Head of Department, As the Chairman, I am proud to welcome you to our esteemed institution. We are committed to providing a nurturing environment for academic excellence and personal growth. Our institution's success lies in its strong leadership, and we are dedicated to maintaining high standards.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.I am proud to welcome you to our esteemed institution.",
      img: "assets/2.png", // Replace with actual image URL for HOD
    },
  ];

  const nextMessage = () => {
    setIsActive(false);
    setTimeout(() => {
      setCurrentMessageIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
      setIsActive(true);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(nextMessage, 5000); // Change the message every 5 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleDotClick = (index) => {
    setIsActive(false);
    setTimeout(() => {
      setCurrentMessageIndex(index);
      setIsActive(true);
    }, 1000);
  };

  return (
    <div className="lg:flex lg:flex-row items-start justify-between gap-[30px] px-[35px] py-[40px]">
      {/* Message Slider Section */}
      <div className="lg:w-[58%] bg-gradient-to-r h-[400px] from-green-600 to-green-800  shadow-xl rounded-lg p-8 relative overflow-hidden">
        <div
          className={`transition-opacity duration-1000 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Message Content with Image */}
          <div className="flex items-center gap-6 mb-6">
            <img
              src={messages[currentMessageIndex].img}
              alt="Management"
              className="w-[120px] h-[120px] rounded-full object-cover shadow-lg"
            />
            <div>
              <div className="font-bold text-[23px] leading-tight text-white">
                {messages[currentMessageIndex].title}
              </div>
              <div className="text-[14px] mt-2 text-white">
                {messages[currentMessageIndex].text}
              </div>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {messages.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentMessageIndex ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="lg:w-[38%] border border-green-800 h-[400px] shadow-xl rounded-lg p-8 relative flex flex-col">
  <div className="font-bold text-[24px] mb-4 text-green-800">Notifications</div>
  <div className="mt-4 overflow-hidden flex-1 relative">
    <div className="absolute top-0 w-full">
      <UpNotificationMarquee />
    </div>
  </div>
</div>

    </div>
  );
};

export default ManagementMessages;
