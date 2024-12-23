import React from "react";
import { BiPhoneCall } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { TbBrandTelegram } from "react-icons/tb";

export const GetInTouch = () => {
  return (
    <div>
    <div className=" flex flex-col lg:flex-row items-center justify-center">
      <div className="w-[328px] h-[333px] shadow-md shadow-[#E0E0E0] flex flex-col justify-center items-center gap-0.5">
        <BiPhoneCall className="text-[#1A8F60] text-[70px]" />
        <p className="text-sm">+917006363XXX</p>
        <p className="text-sm">+914980XXXXXX</p>
        <h2 className="font-bold mt-4">Get Support</h2>
        <input
          type="button"
          value="Submit Request"
          className=" p-1 border-2 border-[#1A8F60] rounded-md font-bold text-[#1A8F60] mt-3"
        />
      </div>

      <div className="h-[393px] w-[328px] bg-[#1A8F60] flex flex-col justify-center items-center gap-0.5">
        <IoLocationOutline className="text-white text-[70px]" />
        <p className="text-sm text-white">hadiamin56@emal.com</p>
        <p className="text-sm text-white">hinnyhap26550@emal.com</p>
        <h2 className="font-bold mt-4 text-white">Get Support</h2>
        <input
          type="button"
          value="Submit Request"
          className="p-1 border-2 border-white rounded-md font-bold text-white mt-3"
        />
      </div>

      <div className="w-[328px] h-[333px] shadow-md shadow-[#E0E0E0] flex flex-col justify-center items-center gap-0.5">
        <TbBrandTelegram className="text-[#1A8F60] text-[70px]" />
        <p className="text-sm">hadiamin56@emal.com</p>
        <p className="text-sm">hinnyhap26550@emal.com</p>
        <h2 className="font-bold mt-4">Get Support</h2>
        <input
          type="button"
          value="Submit Request"
          className="p-1 border-2 border-[#1A8F60] rounded-md font-bold text-[#1A8F60] mt-3"
        />
      </div>
    </div>
    <div className="h-10"></div>
    </div>
  );
};
