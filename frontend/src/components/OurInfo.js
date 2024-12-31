import React from "react";
import { FaUserTie, FaBriefcase, FaLightbulb } from "react-icons/fa";

export const OurInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center h-auto p-4 md:p-8 lg:p-12 bg-gray-200">
      <div className="inline-flex flex-col items-center relative">
        <div className="flex flex-col items-center px-0 py-4 md:py-8 relative justify-center">
          <div className="flex flex-col items-center gap-4 md:gap-8 relative justify-center">
            <div className="text-2xl md:text-3xl lg:text-4xl text-text-color">
              <h1>‘Insightful’</h1>
            </div>
            <p className="text-center text-black">
              Problems trying to resolve the conflict between <br />
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
        </div>
        <div className="inline-flex gap-8 items-center relative flex-wrap ">
          <div className="flex flex-col w-full md:w-[328px] items-start relative">
            <div className="  hover:transition-transform hover:hover:scale-110 flex flex-col w-full gap-4 px-4 py-4 md:px-8 md:py-8 bg-white border border-solid border-[#e8e8e8] shadow-md rounded-lg">
              <div className="flex items-center gap-4">
                <FaUserTie className="w-6 h-6 text-green-500 " />
                <div className="flex flex-col">
                  <div className="text-lg text-text-color font-semibold">Who we are?</div>
                </div>
              </div>
              <div className="">
              <p className="text-black text-sm" >
                ‘TheInsightful’ is a global research and consultancy firm,
                specializing in chemicals and fertilizers. We help our clients
                make business decisions pertaining to strategic planning,
                business improvement, and evaluation of business opportunities.
              </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-[328px] items-start relative ">
            <div className="hover:transition-transform hover:hover:scale-110 flex flex-col w-full gap-4 px-4 py-4 md:px-8 md:py-8 bg-white border border-solid border-[#e8e8e8] shadow-md rounded-lg">
              <div className="flex items-center gap-4">
                <FaLightbulb className="w-6 h-6 text-green-500 " />
                <div className="flex flex-col">
                  <div className="text-lg text-text-color font-semibold">What we do?</div>
                </div>
              </div>
              <div className="h-[120px] ">
              <p className="text-black text-sm">
                We offer intelligence and insights to our clients to make better
                business decisions. Our services include: Reports and
                subscriptions Bespoke research Consulting
              </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-[328px] items-start relative">
            <div className=" hover:transition-transform hover:hover:scale-110  flex flex-col w-full gap-4 px-4 py-4 md:px-8 md:py-8 bg-white border border-solid border-[#e8e8e8] shadow-md rounded-lg">
              <div className="flex items-center gap-4">
                <FaBriefcase className="w-6 h-6 text-green-500" />
                <div className="flex flex-col">
                  <div className="text-lg text-text-color font-semibold">Our Services</div>
                </div>
              </div>
              <div className="h-[120px]">
              <p className="text-black text-sm ">
                Energy and Petrochemical companies Trading companies Financial
                institutions Institutional investors Professional services firms
                Others
              </p>
              </div>
            </div>
          </div>
          {/* Add more items as needed */}
        </div>
        {/* Additional content can go here */}
      </div>
    </div>
  );
};

export default OurInfo;
