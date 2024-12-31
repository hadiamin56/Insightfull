import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./common/Header";
import { FaUpload, FaCheck, FaExclamationCircle } from "react-icons/fa";

const UploadResultsForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [successes, setSuccesses] = useState([]);
  const [records, setRecords] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setErrors([]);
    setSuccesses([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload-result", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      setErrors(response.data.errors || []);
      setSuccesses(response.data.successes || []);

      fetchAllRecords();
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error occurred while uploading the file.");
    }
  };

  const fetchAllRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/results/all-results");
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
      setMessage("Error fetching records.");
    }
  };

  useEffect(() => {
    fetchAllRecords();
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
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
              <li className="text-gray-500">Results</li>
            </ol>
          </nav>
        </div>

        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Upload Student Results</h1>

        {/* Upload Form */}
        <div className="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-xl font-medium mb-4">Upload Results File</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                required
                className="px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:outline-none w-full"
              />
              <FaUpload className="text-blue-500 text-lg" />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Upload File
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-center font-semibold ${errors.length > 0 ? "text-red-500" : "text-green-500"}`}>
              {errors.length > 0 ? <FaExclamationCircle className="mr-2 text-lg" /> : <FaCheck className="mr-2 text-lg" />} {message}
            </p>
          )}
        </div>

        {/* View Records Section */}
        <div>
          <h2 className="text-xl font-medium mb-4">All Student Records</h2>
          <div className="overflow-y-auto max-h-[500px] border rounded-lg shadow-sm p-4 bg-gray-50">
            {records.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No records found.</p>
            ) : (
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-3 px-4 border">Name</th>
                    <th className="py-3 px-4 border">Parentage</th>
                    <th className="py-3 px-4 border">Class</th>
                    <th className="py-3 px-4 border">Section</th>
                    <th className="py-3 px-4 border">R.No</th>
                    <th className="py-3 px-4 border">Marks </th>
                    <th className="py-3 px-4 border">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index} className="border">
                      <td className="py-2 px-4 border">{record.name}</td>
                      <td className="py-2 px-4 border">{record.parentage}</td>
                      <td className="py-2 px-4 border">{record.class}</td>
                      <td className="py-2 px-4 border">{record.section}</td>
                      <td className="py-2 px-4 border">{record.roll_no}</td>
                      <td className="py-2 px-4 border">{record.marks_obtained}/{record.max_marks}</td>
                      <td className="py-2 px-4 border">{record.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResultsForm;
