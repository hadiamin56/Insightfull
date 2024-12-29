import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaIdCard, FaBuilding, FaAward, FaImage, FaPlusCircle, FaExclamationCircle, FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import {Header} from "./common/Header"

const LeaderboardForm = () => {
  const [student_id, setStudentId] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");
  const [department, setDepartment] = useState("");
  const [studentImage, setStudentImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // State for editing entry

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/LeaderboardDetails");
        setLeaderboard(response.data);
      } catch (err) {
        setError("Failed to load leaderboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!studentImage && !editingId) {  // Ensure image is there for new records
      setErrorMessage("Image is required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("student_name", studentName);
    formData.append("class", studentClass);
    formData.append("section", section);
    formData.append("title", "Student of the Week");  // Hardcoded title
    formData.append("department", department);
    if (studentImage) {
      formData.append("student_image", studentImage);
    } else if (editingId) {
      formData.append("student_image", ""); // Placeholder for no new image
    }  
    // console.log("Form Data before submit:", {
    //   studentName,
    //   studentClass,
    //   section,
    //   department,
    //   studentImage
    // });
  
    try {
      if (editingId) {
        // If editing, make a PUT request to /LeaderboardEdit
        const response = await axios.put(`http://localhost:5000/api/admin/LeaderboardEdit/${editingId}`, formData);
        setSuccessMessage(response.data.message);
      } else {
        // If adding, make a POST request
        const response = await axios.post("http://localhost:5000/api/admin/Leaderboard", formData);
        setSuccessMessage(response.data.message);
      }
      setErrorMessage("");
      setStudentName("");
      setStudentClass("");
      setSection("");
      setDepartment("");
      setStudentImage(null);
      setEditingId(null); // Reset editing ID
  
      // Reload leaderboard data
      const updatedLeaderboard = await axios.get("http://localhost:5000/api/admin/LeaderboardDetails");
      setLeaderboard(updatedLeaderboard.data);
    } catch (error) {
      setErrorMessage(error.response?.data.message || "An error occurred");
      setSuccessMessage("");
    }
  };
  
  

  const handleEdit = (entry) => {
    setStudentName(entry.student_name);
    setStudentClass(entry.class);
    setSection(entry.section);
    setDepartment(entry.department);
    setStudentImage(null);  // Ensure studentImage is reset for editing
    setEditingId(entry.student_id); // Set the ID for editing
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/Leaderboard/${id}`);
      setSuccessMessage(response.data.message);

      // Remove deleted entry from leaderboard state
      setLeaderboard(leaderboard.filter(entry => entry.student_id !== id));
    } catch (error) {
      setErrorMessage(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div>
      <Header/>
    <div className="p-6 bg-gray-100 min-h-screen">

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
              <li className="text-gray-500">Student Leaderboard</li>
            </ol>
          </nav>
        </div>
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Leaderboard Form</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Name */}
          <div className="flex items-center space-x-2">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              placeholder="Student Name"
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          {/* Class Dropdown */}
          <div className="flex items-center space-x-2">
            <IoSchoolSharp className="text-gray-500" />
            <select
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="">Select Class</option>
              {Array.from({ length: 13 }, (_, i) => i + 1).map((classNum) => (
                <option key={classNum} value={classNum}>{classNum}</option>
              ))}
              <option value="PreNursery">PreNursery</option>
            </select>
          </div>

          {/* Section Dropdown */}
          <div className="flex items-center space-x-2">
            <FaIdCard className="text-gray-500" />
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="">Select Section</option>
              {['A', 'B', 'C', 'D'].map((sectionOption) => (
                <option key={sectionOption} value={sectionOption}>{sectionOption}</option>
              ))}
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="flex items-center space-x-2">
            <FaBuilding className="text-gray-500" />
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="">Select Department</option>
              <option value="Pre Primary">Pre Primary</option>
              <option value="Primary">Primary</option>
              <option value="Middle">Middle</option>
              <option value="Higher">Higher</option>
            </select>
          </div>

          {/* Image */}
          <div className="flex items-center space-x-2">
            <FaImage className="text-gray-500" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setStudentImage(e.target.files[0])}
              required={!editingId} // Only require image if editing
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Hidden Title Field */}
        <input type="hidden" name="title" value="Student of the Week" />

        <button
          type="submit"
          className="mt-6 bg-green-500 text-white p-3 rounded-full w-full hover:bg-green-600 flex items-center justify-center"
        >
          <FaPlusCircle className="mr-2" />
          {editingId ? "Update Record" : "Add Record"}
        </button>
        <br />

        {successMessage && (
          <div className="text-center text-green-500 mb-4">
            <FaCheck className="inline mr-2" />
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-center text-red-500 mb-4">
            <FaExclamationCircle className="inline mr-2" />
            {errorMessage}
          </div>
        )}
      </form>

      {/* Leaderboard Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left">Image</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Class</th>
              <th className="border p-2 text-left">Section</th>
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2 text-left">Department</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.student_id} className="hover:bg-gray-100">
                <td className="border p-2 text-center">
                  <img
                    src={`http://localhost:5000/${entry.student_image.replace(/\\/g, "/")}`}
                    alt="Student"
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="border p-2">{entry.student_name}</td>
                <td className="border p-2">{entry.class}</td>
                <td className="border p-2">{entry.section}</td>
                <td className="border p-2">{entry.title}</td>
                <td className="border p-2">{entry.department}</td>
                <td className="border p-2 flex space-x-2 justify-center">
                  <button
                    onClick={() => handleEdit(entry)} // Trigger edit when clicked
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.student_id)}  // Correctly pass student_id
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>

  );
};

export default LeaderboardForm;
