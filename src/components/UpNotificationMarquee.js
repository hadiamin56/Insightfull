import React, { useState, useEffect } from "react";
import axios from "axios";

const UpNotificationMarquee = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notificationsview");
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const MarqueeItem = ({ notification }) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const { notification_text, file_path, link_text } = notification;
    const isLink = file_path || link_text;

    // Capitalize the first letter of the notification text
    const capitalizedText =
      notification_text.charAt(0).toUpperCase() + notification_text.slice(1);

    return (
      <li
        className={`marquee-item ${isHovered ? "paused" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isLink ? (
          <a
            href={file_path || link_text}
            target="_blank"
            rel="noopener noreferrer"
            className="notification-link"
          >
            {capitalizedText}
          </a>
        ) : (
          <span>{capitalizedText}</span>
        )}
      </li>
    );
  };

  return (
    <div className="marquee-container">
      <ul className="marquee">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <MarqueeItem key={index} notification={notification} />
          ))
        ) : (
          <li className="marquee-item">No notifications available.</li>
        )}
      </ul>
    </div>
  );
};

export default UpNotificationMarquee;
