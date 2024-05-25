import React from "react";
import { IoDocumentsOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { IoEnterOutline } from "react-icons/io5";

export const InfoCards = () => {
  return (
    <>
      <div className="lg:flex lg:flex-row  items-center justify-center  lg:gap-[50px] lg:-mt-[150px] relative z-20 px-[35px] py-[40px]">
        <div className="lg:w-[328px] lg:h-[243px] bg-white px-[35px] py-[40px] shadow-gray-300 shadow-md flex flex-col gap-2 mt-10">
          <div>
            <VscGraph className="text-[50px]" />
          </div>
          <div className="font-bold rubik-maintitle text-[25px] leading-7">
            Commercial/Market<br></br>Consulting
          </div>
          <div className="rubik-subtitles">sample text</div>
        </div>
        <div className="lg:w-[328px] lg:h-[243px] bg-white px-[35px] py-[40px]  shadow-gray-300 shadow-md mt-10">
          <div>
          
            <IoDocumentsOutline className="text-[50px]" />
          </div>
          <div className="font-bold text-[25px] rubik-maintitle leading-7">
            Bespoke Research
          </div>
          <div className="rubik-subtitles">sample text</div>
        </div>
        <div className="lg:w-[328px] lg:h-[243px] bg-[#1A8F60] px-[35px] py-[40px]  shadow-gray-300 shadow-md text-white mt-10">
          <div>
            <IoEnterOutline className="text-[50px]" />
          </div>
          <div className="font-bold text-[25px] leading-7 rubik-maintitle">
            Reports and <br></br>Subscriptions
          </div>
          <div className="rubik-subtitles"></div>
        </div>
      </div>
    </>
  );
};
