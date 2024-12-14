import React, { useEffect, useState } from "react";
import axios from "axios";

const UserQueriesPage = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/user-queries");
        setQueries(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching queries:", err);
      }
    };

    fetchQueries();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">User Queries</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">S.No</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Email</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Contact</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Query</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query, index) => (
                <tr key={query.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{query.name}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{query.email}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{query.contact}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">{query.query}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserQueriesPage;
