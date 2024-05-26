import React from "react";
import { Header } from "./common/Header";
import { FooterCom } from "./common/FooterCom";
export const Consulting = () => {
  return (
    <div
      className="bg-cover bg-center h-230"
      style={{ backgroundImage: "url(assets/header.png)" }}
    >
      <Header />

      <div className="flex flex-col items-center justify-center p-[45px]">
        <div>
          <h2 className="text-2xl font-rubix font-bold">Reports</h2>
        </div>
        <div className="">
          <p className="text-center leading-5">
            Problems trying to resolve the conflict between <br></br>
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
      </div>
      {/* main body */}
      <div className=" bg-gray-200 h-[800px]   ">
        <div className="items-center justify-center p-[80px]">
          <div className="flex bg-white h-[170px] gap-10 border border-1 border-black ">
            <div className=" w-1/2 bg-green-600 rounded-md"> hello</div>
            <div className=" w-1/2 bg-cyan-600 rounded-md"> hello</div>
          </div>
          <div className="flex bg-white h-[170px] gap-10 border border-1 border-black mt-10">
            <div className=" w-1/2 bg-green-600 rounded-md"> hello</div>
            <div className=" w-1/2 bg-cyan-600 rounded-md"> hello</div>
          </div>
          <div className="flex bg-white h-[170px] gap-10 border border-1 border-black mt-10">
            <div className=" w-1/2 bg-green-600 rounded-md"> hello</div>
            <div className=" w-1/2 bg-cyan-600 rounded-md"> hello</div>
          </div>
        </div>
      </div>
      <FooterCom />
    </div>
  );
};
