import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name: name,
      email: email,
      contact: contact,
      query: query,
    };

    try {
      const response = await fetch("sql7.freemysqlhosting.net/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();  // Handling JSON error
        throw new Error(errorData.error || "An error occurred");
      }

      const data = await response.json();  // Handling success
      setSuccessMessage(data.message);  // Display success message
      setErrorMessage("");  // Clear any previous error messages

      // Reset the form fields after successful submission
      setName("");
      setEmail("");
      setContact("");
      setQuery("");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);  // Display the error message
      setSuccessMessage("");  // Clear any previous success messages
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">Contact Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-600">Contact:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-600">Query:</label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      {errorMessage && <p className="mt-4 text-red-500 text-center">{errorMessage}</p>}
      {successMessage && <p className="mt-4 text-green-500 text-center">{successMessage}</p>}
    </div>
  );
};

export default ContactForm;
