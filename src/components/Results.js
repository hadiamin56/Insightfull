import React, { useState } from "react";
import axios from "axios";
import { Header } from "./common/Header";
import {
  AcademicCapIcon,
  PhoneIcon,
  UserIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";

const Results = () => {
  const [rollNo, setRollNo] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const fetchResult = async () => {
    setError("");
    setResult(null);
    if (!rollNo) {
      setError("Please enter a roll number.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/results", {
        params: { roll_no: rollNo },
      });
      setResult(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No results found for the given roll number.");
      } else {
        setError("An error occurred while fetching the result.");
      }
    }
  };

  const downloadPDF = () => {
    const button = document.getElementById("download-button");
    button.style.display = "none";

    const element = document.getElementById("result-card");
    const opt = {
      margin: 1,
      filename: `${result.name}_Result.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .finally(() => {
        button.style.display = "inline-block";
      });
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center py-10">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-10">
          <h1 className="text-center text-5xl font-bold text-gray-800 mb-8">
            Student Report Card
          </h1>
          {/* 
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-700">
              Your School Name
            </h2>
            <h3 className="text-xl font-medium text-gray-600">
              Board of Education
            </h3>
          </div> */}

          <div className="flex justify-center mb-8">
            <input
              type="text"
              className="w-1/2 p-4 border-2 border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
            <button
              onClick={fetchResult}
              className="ml-4 py-3 px-6 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition duration-300"
            >
              Search
            </button>
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {result && (
            <div
              id="result-card"
              className="bg-gray-50 p-6 border border-gray-200 rounded-xl shadow-md mt-8"
            >
              {/* Student Information Table */}
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Student Information
              </h2>
              <table className="min-w-full text-left mb-8 border border-gray-300">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold text-gray-700">
                      Name
                    </td>
                    <td className="py-2 px-4">{result.name}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold text-gray-700">
                      Parentage
                    </td>
                    <td className="py-2 px-4">{result.parentage}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold text-gray-700">
                      Roll No
                    </td>
                    <td className="py-2 px-4">{result.roll_no}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold text-gray-700">
                      Class
                    </td>
                    <td className="py-2 px-4">{result.class}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold text-gray-700">
                      Section
                    </td>
                    <td className="py-2 px-4">{result.section}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold text-gray-700">
                      Phone Number
                    </td>
                    <td className="py-2 px-4">{result.phone_number}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold text-gray-700">
                      Date of Birth
                    </td>
                    <td className="py-2 px-4">
                      {result.dob
                        ? new Date(result.dob).toLocaleDateString()
                        : "N/A"}
                    </td>{" "}
                  </tr>
                </tbody>
              </table>

              {/* Marks Table */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Marks Details
              </h2>
              <table className="min-w-full text-left table-auto mb-8 border border-gray-300">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="py-3 px-4 border-b border-gray-300">
                      Max Marks
                    </th>
                    <th className="py-3 px-4 border-b border-gray-300">
                      Marks Obtained
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4">{result.max_marks}</td>
                    <td className="py-2 px-4">{result.marks_obtained}</td>
                  </tr>
                </tbody>
              </table>

              {/* Result Summary Table */}
              <table className="min-w-full text-left table-auto mb-8 border-gray-300">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 font-semibold text-gray-700">
                      Result
                    </td>
                    <td className="py-2">
                      <span
                        className={`py-2 px-6 text-white font-semibold inline ${
                          result.result === "Pass"
                            ? "bg-green-700"
                            : "bg-red-700"
                        }`}
                      >
                        {result.result === "Pass" ? (
                          <>
                            <CheckCircleIcon className="h-6 w-6 inline mr-2" />
                            Passed :
                            <span className="ml-2">Congratulations!</span>
                          </>
                        ) : (
                          <>
                            <XCircleIcon className="h-6 w-6 inline mr-2" />
                            Failed :
                            <span className="ml-2">Better luck next time</span>
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Download PDF Button */}
              <div className="mt-8 text-center">
                <button
                  id="download-button"
                  onClick={downloadPDF}
                  className="py-3 px-6 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition duration-300"
                >
                  Download Report Card
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
