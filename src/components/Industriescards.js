import React from "react";

export const Industriescards = () => {
  return (
    // main container
    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-center p-5 ">
      {/* First row */}
      <div className="flex flex-wrap justify-center gap-[40px] w-full max-w-screen-lg ">
        {/* First item */}
        <div className="shadow-md shadow-black-600 w-[300px] bg-[#1A8F60] ">
          <a href="#">
            <div className="flex flex-col px-6">
              <h2 className="text-md font-bold mt-5 text-[#1A8F60] rounded-sm text-center rubik-maintitle bg-white">
                Olefins / Polyolefins
              </h2>
              <p className="text-sm mt-5 text-white rubik-subtitle">
                Newton thought that light was made up of particles, <br />
                but then it was discovered
              </p>
            </div>
            <img
              src="assets/practice.jpg"
              className="w-[300px] h-[200px] mt-4"
              alt="Basic Chemicals"
            />
          </a>
        </div>
        {/* Second item */}
        <div className="shadow-md shadow-black-600 w-[300px] bg-[#1A8F60]">
          <div className="flex flex-col px-6">
            <h2 className="text-md font-bold mt-5 text-[#1A8F60] rounded-sm text-center bg-white rubik-maintitle">
              Butadiene derivatives
            </h2>
            <p className="text-sm mt-5 text-white rubik-subtitles">
              Newton thought that light was made up of particles, <br />
              but then it was discovered
            </p>
          </div>
          <img
            src="assets/practice.jpg"
            className="w-[300px] h-[200px] mt-4 ml-0.5"
            alt="Specialty Chemicals"
          />
        </div>
        {/* Third item */}
        <div className="shadow-md shadow-black-600 w-[300px] bg-[#1A8F60]">
          <div className="flex flex-col px-6">
            <h2 className="text-md font-bold mt-5 text-[#1A8F60] rounded-sm text-center bg-white rubik-maintitle">
              Fertilizers
            </h2>
            <p className="text-sm mt-5 text-white rubik-subtitles">
              Newton thought that light was made up of particles, <br />
              but then it was discovered
            </p>
          </div>
          <img
            src="assets/practice.jpg"
            className="w-[300px] h-[200px] mt-4 ml-0.5"
            alt="Plastic and Polymers"
          />
        </div>
        {/* Fourth item */}
        <div className="shadow-md shadow-black-600 w-[300px] bg-[#1A8F60]">
          <div className="flex flex-col px-6">
            <h2 className="text-md font-bold mt-5 text-[#1A8F60] rounded-sm text-center bg-white rubik-maintitle">
              Aromatics
            </h2>
            <p className="text-sm mt-5 text-white rubik-subtitles">
              Newton thought that light was made up of particles, <br />
              but then it was discovered
            </p>
          </div>
          <img
            src="assets/practice.jpg"
            className="w-[300px] h-[200px] mt-4 ml-0.5"
            alt="Fertilizers"
          />
        </div>
      </div>

      {/* Second row */}
      <div className="flex flex-wrap justify-center gap-[40px] w-full max-w-screen-lg ">
        {/* Fifth item */}
        <div className="shadow-md shadow-black-600 w-[300px] bg-[#1A8F60]">
          <a href="#">
            <div className="flex flex-col px-6">
              <h2 className="text-md font-bold mt-5 text-[#1A8F60] rounded-sm text-center bg-white rubik-maintitle">
                Vinyls
              </h2>
              <p className="text-sm mt-5 text-white rubik-subtitles">
                Newton thought that light was made up of particles, <br />
                but then it was discovered
              </p>
            </div>
            <img
              src="assets/practice.jpg"
              className="w-[300px] h-[200px] mt-4 ml-0.5"
              alt="Basic Chemicals"
            />
          </a>
        </div>
        {/* Sixth item */}
        <div className="shadow-md shadow-black-600 w-[300px] bg-[#1A8F60]">
          <div className="flex flex-col px-6">
            <h2 className="text-md font-bold mt-5 text-[#1A8F60] rounded-sm text-center bg-white rubik-maintitle">
              Polyesters
            </h2>
            <p className="text-sm mt-5 text-white rubik-subtitles">
              Newton thought that light was made up of particles, <br />
              but then it was discovered
            </p>
          </div>
          <img
            src="assets/practice.jpg"
            className="w-[300px] h-[200px] mt-4 ml-0.5"
            alt="Specialty Chemicals"
          />
        </div>
        {/* Seventh item */}
        <div className="shadow-md shadow-black-600 w-[300px] bg-[#1A8F60]">
          <div className="flex flex-col px-6">
            <h2 className="text-md font-bold mt-5 text-[#1A8F60] rounded-sm text-center bg-white rubik-maintitle">
              Phenolics
            </h2>
            <p className="text-sm mt-5 text-white rubik-subtitles">
              Newton thought that light was made up of particles <br />
              but then it was discovered
            </p>
          </div>
          <img
            src="assets/practice.jpg"
            className="w-[300px] h-[200px] mt-4 ml-0.5"
            alt="Plastic and Polymers"
          />
        </div>
        {/* Eighth item */}
        <div className="shadow-md shadow-black-600 w-[300px] bg-[#1A8F60]">
          <div className="flex flex-col px-6">
            <h2 className="text-md font-bold mt-5 text-[#1A8F60] rounded-sm text-center rubik-maintitle bg-white">
              C1 and derivatives
            </h2>
            <p className="text-sm mt-5 text-white rubik-subtitles">
              Newton thought that light was made up of particles, <br />
              but then it was discovered
            </p>
          </div>
          <img
            src="assets/practice.jpg"
            className="w-[300px] h-[200px] mt-4 ml-0.5"
            alt="Fertilizers"
          />
        </div>
      </div>
    </div>
  );
};
