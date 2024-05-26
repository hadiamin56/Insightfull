import React from "react";
import { Header } from "./common/Header";
import { FooterCom } from "./common/FooterCom";
import { BsArrowRightSquareFill } from "react-icons/bs";

export const Consulting = () => {
  return (
    <div
      className="bg-cover bg-center h-230"
      style={{ backgroundImage: "url(assets/header.png)" }}
    >
      <Header />

      <div className="flex flex-col items-center justify-center p-[45px]">
        <div>
          <h2 className="text-2xl font-rubix font-bold rubik-maintitle">Reports</h2>
        </div>
        <div className="">
          <p className="text-center leading-5 rubik-subtitles ">
            Problems trying to resolve the conflict between <br></br>
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
      </div>
      {/* main body */}
      <div className=" bg-gray-200 h-[800px]">
        <div className="items-center justify-center p-[80px]">
          <div className="flex  h-[130px] gap-10  ">

            <div className=" flex w-1/2 bg-whiterounded-md p-10 rounded-md bg-white shadow-sm shadow-[#1A8F60]">
              <BsArrowRightSquareFill className="text-3xl mt-1 text-[#1A8F60]" /> 
              <div className="flex flex-col">
                <p className="text-xl font-bold ml-3 rubik-maintitle">Market analysis</p>
                <p className="ml-3 rubik-subtitles">
                  Growing demand for sustainable solutions driving market shift
                </p>
              </div>
            </div>
            
            <div className=" flex w-1/2 bg-white rounded-md p-10 shadow-sm shadow-[#1A8F60]">
              <BsArrowRightSquareFill className="text-3xl mt-1 text-[#1A8F60]" /> 
              <div className="flex flex-col">
                <p className="text-xl font-bold ml-3 rubik-maintitle">Strategic Planning</p>
                <p className="ml-3 rubik-subtitles">
                  Growing demand for sustainable solutions driving market shift
                </p>
              </div>
            </div>
          </div>
          <div className="flex  h-[130px] gap-10  mt-10">
          <div className=" flex w-1/2 rounded-md p-10 bg-white  shadow-sm shadow-[#1A8F60]">
              <BsArrowRightSquareFill className="text-3xl mt-1 text-[#1A8F60]" /> 
              <div className="flex flex-col">
                <p className="text-xl font-bold ml-3 rubik-maintitle">Growth initiatives</p>
                <p className="ml-3 rubik-subtitles">
                  Growing demand for sustainable solutions driving market shift
                </p>
              </div>
            </div>
            <div className=" flex w-1/2 rounded-md p-10 bg-white shadow-sm shadow-[#1A8F60]">
              <BsArrowRightSquareFill className="text-3xl mt-1 text-[#1A8F60]" /> 
              <div className="flex flex-col">
                <p className="text-xl font-bold ml-3 rubik-maintitle">Operational improvements</p>
                <p className="ml-3 rubik-subtitles">
                  Growing demand for sustainable solutions driving market shift
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-[130px] gap-10  mt-10">
          <div className=" flex w-1/2 bg-white rounded-md p-10 shadow-sm shadow-[#1A8F60]">
              <BsArrowRightSquareFill className="text-3xl mt-1 text-[#1A8F60]" /> 
              <div className="flex flex-col">
                <p className="text-xl font-bold ml-3 rubik-maintitle">Bespoke Research</p>
                <p className="ml-3 rubik-subtitles">
                  Growing demand for sustainable solutions driving market shift
                </p>
              </div>
            </div>
            <div className=" flex w-1/2 bg-white rounded-md p-10 shadow-sm shadow-[#1A8F60]">
              <BsArrowRightSquareFill className="text-3xl mt-1 text-[#1A8F60]" /> 
              <div className="flex flex-col">
                <p className="text-xl font-bold ml-3 rubik-maintitle">General analysis</p>
                <p className="ml-3 rubik-subtitles">
                  Growing demand for sustainable solutions driving market shift
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterCom />
    </div>
  );
};
