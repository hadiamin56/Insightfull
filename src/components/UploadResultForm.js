import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./common/Header";

const UploadResultsForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [successes, setSuccesses] = useState([]);
  const [records, setRecords] = useState([]); // State to store all records

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setErrors([]);
    setSuccesses([]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-result",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      setErrors(response.data.errors || []);
      setSuccesses(response.data.successes || []);

      // Fetch all records after successful upload
      fetchAllRecords();
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error occurred while uploading the file.");
    }
  };

  // Fetch all records
  const fetchAllRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/results/all-results"
      );
      setRecords(response.data); // Store fetched records
    } catch (error) {
      console.error("Error fetching results:", error);
      setMessage("Error fetching records.");
    }
  };

  // Fetch records when component mounts
  useEffect(() => {
    fetchAllRecords();
  }, []);

  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Upload Student Results
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Excel File
            </label>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          >
            Upload
          </button>
        </form>

        {message && (
          <div className="mt-6">
            <p
              className={`text-center font-semibold ${
                errors.length > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          </div>
        )}

        {errors.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-red-600">Errors:</h3>
            <ul className="list-disc list-inside text-red-500">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {successes.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-green-600">Successes:</h3>
            <ul className="list-disc list-inside text-green-500">
              {successes.map((success, index) => (
                <li key={index}>{success}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          All Student Records
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 border">Name</th>
                <th className="py-3 px-4 border">Parentage</th>
                <th className="py-3 px-4 border">Class</th>
                <th className="py-3 px-4 border">Section</th>
                <th className="py-3 px-4 border">Phone Number</th>
                <th className="py-3 px-4 border">Roll No</th>
                <th className="py-3 px-4 border">DOB</th>
                <th className="py-3 px-4 border">Max Marks</th>
                <th className="py-3 px-4 border">Marks Obtained</th>
                <th className="py-3 px-4 border">Result</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr key={index} className="border">
                    <td className="py-2 px-4 border">{record.name}</td>
                    <td className="py-2 px-4 border">{record.parentage}</td>
                    <td className="py-2 px-4 border">{record.class}</td>
                    <td className="py-2 px-4 border">{record.section}</td>
                    <td className="py-2 px-4 border">{record.phone_number}</td>
                    <td className="py-2 px-4 border">{record.roll_no}</td>
                    <td className="py-2 px-4">
                      {record.dob
                        ? new Date(record.dob).toLocaleDateString()
                        : "N/A"}
                    </td>{" "}
                    <td className="py-2 px-4 border">{record.max_marks}</td>
                    <td className="py-2 px-4 border">{record.marks_obtained}</td>
                    <td className="py-2 px-4 border">{record.result}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UploadResultsForm;
