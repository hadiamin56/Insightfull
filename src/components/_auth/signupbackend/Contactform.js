// ReactForm.js
import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactnumber: "",
    email: "",
    Reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://insightfull.vercel.app/signup",
        formData
      );
      console.log("Form successfully submitted");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="h-[500px] bg-cover bg-center p-10"
      style={{ backgroundImage: "url(assets/cover.png)" }}
    >
      <div className="max-w-screen-lg mx-auto">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">Contact us</p>
          <h1 className="text-3xl font-bold text-gray-900">Make an appointment</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              id="fullName"
              className="input-field"
              placeholder="Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
    

            <input
              type="text"
              id="contactnumber"
              className="input-field"
              placeholder="Contact Number"
              name="contactnumber"
              value={formData.contactnumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              id="Reason"
              className="input-field"
              placeholder="Reason"
              name="Reason"
              value={formData.Reason}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit rubik-maintitle">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
