import React from "react";
import { IoDocumentsOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { IoEnterOutline } from "react-icons/io5";
// import NotificationMarquee from "./NotificationMarquee";
import { CiMemoPad } from "react-icons/ci";
import { ImUsers } from "react-icons/im";
import { RiInformation2Fill } from "react-icons/ri";

export const InfoCards = () => {
  return (
    <>
      <div>
        <div className="lg:flex lg:flex-row items-center justify-center lg:gap-[50px] lg:-mt-[50px] relative z-20 px-[35px] py-[40px]">
          
          {/* Admission Card */}
          <div className="lg:w-[328px] lg:h-[400px] bg-green-800 shadow-gray-300 shadow-md flex flex-col mt-10 relative group">
            {/* Image covering 65% of the div */}
            <img
              src="assets/2.png"
              alt="Admission"
              className="w-full h-[65%] object-cover rounded-t-md"
            />
            {/* Icon and Text */}
            <div className="flex items-center gap-4 p-4 h-[35%] mt-4 text-white">
              <CiMemoPad className="text-[50px] group-hover:hidden" />
              <div className="group-hover:hidden">
                <div className="font-bold rubik-maintitle text-[23px] leading-7">
                  Admission
                </div>
                <div className="rubik-subtitles text-[15px]">
                  Learn more about our admission process.
                </div>
              </div>
            </div>
            {/* Hover effect */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-green-700 opacity-0 group-hover:opacity-100 group-hover:h-full transition-all duration-300 p-4 text-white">
              <div className="text-center">
                <div className="font-bold rubik-maintitle text-[23px] leading-7">
                  Admission
                </div>
                <div className="rubik-subtitles text-[15px]">
                Discover all the details about our admission process and how to apply. Find out about eligibility, requirements, and deadlines for the upcoming academic year. Our comprehensive admission guide will walk you through the entire process, from submitting your application to preparing for interviews and securing financial aid. We offer a range of programs, including undergraduate, graduate, and certificate courses, all designed to help you succeed in your academic journey.
                </div>
                <button className="mt-4 px-6 py-2 bg-white text-green-800 font-bold rounded-md">
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* Alumni Card */}
          <div className="lg:w-[328px] lg:h-[400px] bg-green-800 shadow-gray-300 shadow-md flex flex-col mt-10 relative group">
            {/* Image covering 65% of the div */}
            <img
              src="assets/3.png"
              alt="Alumni Network"
              className="w-full h-[65%] object-cover rounded-t-md"
            />
            {/* Icon and Text */}
            <div className="flex items-center gap-4 p-4 h-[35%] mt-4 text-white">
              <ImUsers className="text-[50px] group-hover:hidden" />
              <div className="group-hover:hidden">
                <div className="font-bold text-[23px] rubik-maintitle leading-7">
                  Alumni Network
                </div>
                <div className="rubik-subtitles text-[15px]">
                  Stay connected with our alumni network.
                </div>
              </div>
            </div>
            {/* Hover effect */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-green-700 opacity-0 group-hover:opacity-100 group-hover:h-full transition-all duration-300 p-4 text-white">
              <div className="text-center">
                <div className="font-bold text-[23px] leading-7">
                  Alumni Network
                </div>
                <div className="rubik-subtitles text-[15px]">
                  Stay connected with our alumni network to get support and opportunities.
                </div>
                <button className="mt-4 px-6 py-2 bg-white text-green-800 font-bold rounded-md">
                  Share News
                </button>
              </div>
            </div>
          </div>

          {/* About Us Card */}
          <div className="lg:w-[328px] lg:h-[400px] bg-green-800 text-white shadow-gray-300 shadow-md flex flex-col mt-10 relative group">
            {/* Image covering 65% of the div */}
            <img
              src="assets/4.jpg"
              alt="About Us"
              className="w-full h-[65%] object-cover rounded-t-md"
            />
            {/* Icon and Text */}
            <div className="flex items-center gap-4 p-4 h-[35%] mt-4 text-white">
              <IoDocumentsOutline className="text-[50px] group-hover:hidden" />
              <div className="group-hover:hidden">
                <div className="font-bold text-[23px] leading-7 rubik-maintitle">
                  About Us
                </div>
                <div className="rubik-subtitles text-[15px]">
                  Discover more about our institution.
                </div>
              </div>
            </div>
            {/* Hover effect */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-green-700 opacity-0 group-hover:opacity-100 group-hover:h-full transition-all duration-300 p-4">
              <div className="text-center">
                <div className="font-bold text-[23px] leading-7 rubik-maintitle">
                  About Us
                </div>
                <div className="rubik-subtitles text-[15px]">
                  Learn about our history, mission, and values that guide us every day.
                </div>
                <button className="mt-4 px-6 py-2 bg-white text-green-800 font-bold rounded-md">
                  Know More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
