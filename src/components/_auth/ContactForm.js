import React from 'react';


export const ContactForm = () => {
  return (
    <div className="max-w-md mx-auto mt-[60px]">
      
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 block w-full border border-[#1A8F60] rounded-md focus:outline-none"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-[#1A8F60]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 block w-full border border-[#1A8F60] rounded-md focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-[#1A8F60]">
            Phone Number
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            className="mt-1 p-2 block w-full border border-[#1A8F60] rounded-md focus:outline-none"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-[#1A8F60]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="mt-1 p-2 block w-full border border-[#1A8F60] rounded-md focus:outline-none "
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#1A8F60] text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
