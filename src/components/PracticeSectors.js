import React from "react";

export const PracticeSectors = () => {
  return (
    // main container
    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-center gap-[40px] p-5">

      {/* first block */}
    <div className="flex flex-col md:flex-row gap-[50px] w-fit p-2">
        <div className="  shadow-md shadow-black-600 w-[232px] "> 
        <a href="https://fonts.google.com/knowledge/using_type/installing_and_managing_fonts">
          <div className="flex flex-col px-6 ">
            <h2 className="text-md font-bold mt-5">Basic Chemicals</h2>
            <p className="text-sm mt-5 text-gray-600">
              Newton thought that light was made up of particles, <br></br>but
              then it was discovered
            </p>
          </div>
           <img
            src="assets/practice.jpg"
            className="w-[230px] h-[138px] mt-5"
            alt="Basic Chemicals"
          />
            </a>
        </div>
        <div className="  shadow-md shadow-black-600 w-[232px] ">
          <div className="flex flex-col px-6 ">
            <h2 className="text-md font-bold mt-5">Specialty Chemicals</h2>
            <p className="text-sm mt-5 text-gray-600">
              Newton thought that light was made up of particles, <br></br>but
              then it was discovered{" "}
            </p>
          </div>

          <img
            src="assets/practice.jpg"
            className="w-[230px] h-[138px] mt-5"
            alt="Basic Chemicals"
          />
        </div>
    </div>
    <div className="flex flex-col md:flex-row gap-[50px] w-fit p-2">
        <div className="  shadow-md shadow-black-600 w-[232px] ">
          <div className="flex flex-col px-6 ">
            <h2 className="text-md font-bold mt-5">Plastic and Polymers</h2>
            <p className="text-sm mt-5 text-gray-600">
              Newton thought that light was made up of particles, <br></br>but
              then it was discovered{" "}
            </p>
          </div>
          <img
            src="assets/practice.jpg"
            className="w-[230px] h-[138px] mt-5"
            alt="Basic Chemicals"
          />
        </div>
        <div className="  shadow-md shadow-black-600 w-[232px] ">
          <div className="flex flex-col px-6 ">
            <h2 className="text-md font-bold mt-5">Fertilizers</h2>
            <p className="text-sm mt-5 text-gray-600">
              Newton thought that light was made up of particles, <br></br>but
              then it was discovered{" "}
            </p>
          </div>

          <img
            src="assets/practice.jpg"
            className="w-[230px] h-[138px] mt-5"
            alt="Basic Chemicals"
          />
        </div>
      </div>
    </div>
  );
};
