import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload, FaCheck, FaExclamationCircle, FaTrash } from "react-icons/fa";
import { Header } from "./common/Header";

const NotificationForm = () => {
  const [notificationText, setNotificationText] = useState("");
  const [linkText, setLinkText] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch Notifications
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notificationsview");
      setNotifications(response.data);
    } catch (err) {
      setErrorMessage("Failed to load notifications.");
    }
  };

  // Add Notification
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!notificationText) {
      setErrorMessage("Notification text is required.");
      return;
    }

    const formData = new FormData();
    formData.append("notification_text", notificationText);

    if (file) {
      formData.append("file", file);
    }

    if (linkText) {
      formData.append("link_text", linkText);
    }

    try {
      await axios.post("http://localhost:5000/api/notifications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("Notification added successfully!");
      setNotificationText("");
      setFile(null);
      setLinkText("");
      fetchNotifications();
    } catch (err) {
      setErrorMessage("Failed to add notification.");
    }
  };

  // **Delete Notification**
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notificationdelete/${id}`);
      setSuccessMessage("Notification deleted successfully!");
      fetchNotifications(); // Refresh the list after deletion
    } catch (err) {
      setErrorMessage("Failed to delete notification.");
    }
  };

  // Toggle Notifications View
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">
          Add Notification
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Notification Text:
            </label>
            <textarea
              value={notificationText}
              onChange={(e) => setNotificationText(e.target.value)}
              rows="3"
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Attach File:</label>
            <div className="flex items-center">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <FaUpload className="ml-2 text-blue-500 text-lg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Link Text:</label>
            <textarea
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              rows="1"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {errorMessage && (
          <p className="mt-4 text-red-500 text-center flex items-center justify-center">
            <FaExclamationCircle className="mr-2 text-xl" />
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="mt-4 text-green-500 text-center flex items-center justify-center">
            <FaCheck className="mr-2 text-xl" />
            {successMessage}
          </p>
        )}

        {/* Collapsible Notifications Section */}
        <div className="mt-8">
          <button
            onClick={toggleNotifications}
            className="w-full py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {isOpen ? "Collapse Notifications" : "Show Notifications"}
          </button>

          {isOpen && (
            <div className="mt-4 space-y-4">
              {notifications.length === 0 ? (
                <p className="text-gray-600 text-center">No notifications available.</p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border p-4 rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-700 mb-2">{notification.notification_text}</p>

                      {notification.file_path && (
                        <a
                          href={`http://localhost:5000/${notification.file_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View File
                        </a>
                      )}

                      {notification.link_text && (
                        <a
                          href={notification.link_text}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline ml-4"
                        >
                          Visit Link
                        </a>
                      )}
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationForm;
