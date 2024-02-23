import React from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoSpeedometerOutline } from "react-icons/io5";

export const WhoWeAre = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-8 lg:p-16">
      {/* Image */}
      <div className="mb-8 lg:mb-0">
        <img src="assets/cover.png" className="w-[597px] h-[442px] shadow-sm lg:shadow-lg" alt="Cover" />
      </div>

      {/* Text Content */}
      <div className="bg-white max-w-lg lg:w-96 lg:h-96 p-8 lg:p-10 rounded-lg lg:ml-8">
        <div className="mb-8">
          <h2 className="font-bold text-xl lg:text-3xl leading-tight mb-4">
            Most trusted in <br className="lg:hidden" /> our field
          </h2>
          <p className="text-sm lg:text-base leading-6">
            Most calendars are designed for teams. Slate <br className="lg:hidden" />is designed for
            freelancers who want a <br className="lg:hidden" /> simple way to plan their schedule.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col space-y-4">
          {/* Feature 1 */}
          <div className="flex items-center">
            <FaPeopleGroup className="text-[#1A8F60] text-3xl lg:text-5xl mr-4" />
            <div>
              <h2 className="font-bold text-lg lg:text-xl">
                The quick fox jumps over the lazy dog
              </h2>
              <p className="text-sm lg:text-base">Things on a very small scale ...</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center">
            <IoSpeedometerOutline className="text-[#1A8F60] text-3xl lg:text-5xl mr-4" />
            <div>
              <h2 className="font-bold text-lg lg:text-xl">
                The quick fox jumps over the lazy dog
              </h2>
              <p className="text-sm lg:text-base">Things on a very small scale ...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
