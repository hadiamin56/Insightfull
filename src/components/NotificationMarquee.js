import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationMarquee = () => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notificationsview");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // Optionally, refresh the notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleNotificationClick = (notification) => {
    // If the notification has a link
    if (notification.link_text) {
      window.open(notification.link_text, "_blank");
    }
  };

  return (
    <div className="flex">
      {/* Notifications box on the left with fixed width */}
      <div className="w-[130px] bg-green-800 h-[40px] text-white p-2 flex items-center justify-center">
        <h2 className="text-m font-semibold">Notifications</h2>
      </div>

      <div className="flex-1 bg-gray-100 h-[40px] overflow-hidden p-2 rounded-r-lg">
  <div
    className="notification-marquee-wrapper flex items-center justify-start space-x-4"
  >
    <div
      className="notification-marquee flex space-x-4 animate-marquee"
      onMouseEnter={(e) => e.target.classList.add("animate-none")}  // Stop animation on hover
      onMouseLeave={(e) => e.target.classList.remove("animate-none")}  // Resume animation when hover ends
    >
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <h1
            key={notification.id}
            className="notification-item cursor-pointer text-sm w-full truncate" // Added 'w-full' and 'truncate'
            onClick={() => handleNotificationClick(notification)}
          >
            <a
              href={notification.link_text || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {notification.notification_text}
            </a>
          </h1>
        ))
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  </div>
</div>

    </div>
  );
};

export default NotificationMarquee;
