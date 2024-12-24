import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./common/Header";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa"; // Import icons

const UserQueriesPage = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState({});
  const [status, setStatus] = useState({});

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/queries"
        );
        setQueries(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching queries:", err);
      }
    };
    fetchQueries();
  }, []);

  // Handle Note Change
  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [id]: value,
    }));
  };

  const handleMarkAsDone = async (id) => {
    // Optimistically update the status in the UI
    setStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id], // Toggle the status immediately
    }));

    try {
      // Update the status and notes on the backend
      await axios.patch(`http://localhost:5000/api/admin/updateQuery/${id}`, {
        notes: notes[id] || "", // Send the note or empty string
        status: !status[id], // Toggle status
      });

      // Refetch the query after successfully updating it
      const response = await axios.get(
        "http://localhost:5000/api/admin/queries"
      );
      setQueries(response.data); // Update the queries state with the latest data
    } catch (error) {
      console.error("Error updating query:", error);

      // If there's an error, revert the status back to the original state
      setStatus((prevStatus) => ({
        ...prevStatus,
        [id]: !prevStatus[id], // Revert the toggle
      }));
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust this format as needed
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            User Queries
          </h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                    S.No
                  </th>
                  <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                    Email
                  </th>
                  <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                    Contact
                  </th>
                  <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                    Query
                  </th>
                  <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                    Notes
                  </th>
                  <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                    Query Received On
                  </th>
                  <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                    Query Closed On
                  </th>
                </tr>
              </thead>
              <tbody>
                {queries.map((query, index) => (
                  <tr
                    key={query.id}
                    className={`hover:bg-gray-50 ${
                      query.status === 1 ? "bg-green-200" : ""
                    }`}
                  >
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {query.name}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {query.email}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {query.contact}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {query.query}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {query.status === 1 ? (
                        <span className="text-gray-500">
                          {query.notes ? query.notes : "No notes added"}
                        </span>
                      ) : (
                        <input
                          type="text"
                          value={notes[query.id] || ""}
                          onChange={(e) =>
                            handleNoteChange(query.id, e.target.value)
                          }
                          placeholder="Add notes"
                          className="px-2 py-1 border rounded-md w-full"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      <button
                        onClick={() => handleMarkAsDone(query.id)}
                        className={`flex items-center px-3 py-1 rounded-md text-white ${
                          query.status === 1
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {query.status === 1 ? (
                          <>
                            <FaCheckCircle className="mr-1" /> Processed
                          </>
                        ) : (
                          <>
                            <FaRegCircle className="mr-1" /> Unprocessed
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {formatDate(query.created_at)}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {query.status === 1 ? formatDate(query.updated_at) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserQueriesPage;
