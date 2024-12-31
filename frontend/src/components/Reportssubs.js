import React from "react";
import { Header } from "./common/Header";
import { FooterCom } from "./common/FooterCom";
export const Reportssubs = () => {
  return (
    <>
        <div  className='bg-cover bg-center h-230' style={{backgroundImage: 'url(assets/header.png)'}}>

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
  </div>
  <div className="h-5"></div>
      {/* item 1 */}
      <div className="flex h-[455px] items-center justify-center gap-[15px]">
        <div className="h-[451px] w-[322px] flex flex-col">
          <img
            src="/assets/reports2.jpg"
            alt="image"
            className="h-[451px] w-[322px]"
          ></img>
          <div className="absolute top-[550px]  w-[322px]">
            <div className="">
              <p className="text-white  text-md font-bold ml-4">
                Market Analysis reports
              </p>
            </div>
            <p className="text-white ml-4 text-2xl font-bold">
              Insightful reports drive informed decisions.
            </p>
            <input
              type="button"
              value="View Report"
              className=" text-white font-bold w-[150px] h-[50px] bg-[#1A8F60] ml-3 rounded-2xl p-1  "
            ></input>
          </div>
        </div>
        {/* item 2 */}
        <div className="h-[451px] w-[322px] flex flex-col">
          <img
            src="/assets/reports2.jpg"
            alt="image"
            className="h-[451px] w-[322px]"
          ></img>
          <div className="absolute top-[550px]  w-[322px]">
            <div className="">
              <p className="text-white  text-md font-bold ml-4 rubik-maintitle">
                Market Analysis reports
              </p>
            </div>
            <p className="text-white ml-4 text-2xl font-bold">
              Insightful reports drive informed decisions.
            </p>
            <input
              type="button"
              value="View Report"
              className=" text-white font-bold w-[150px] h-[50px] bg-[#1A8F60] ml-3 rounded-2xl p-1  "
            ></input>
          </div>
        </div>
        <div className="h-[451px] w-[322px] flex flex-col">
          <img
            src="/assets/reports2.jpg"
            alt="image"
            className="h-[451px] w-[322px]"
          ></img>
          <div className="absolute top-[550px]  w-[322px]">
            <div className="">
              <p className="text-white  text-md font-bold ml-4">
                Market Analysis reports
              </p>
            </div>
            <p className="text-white ml-4 text-2xl font-bold">
              Insightful reports drive informed decisions.
            </p>
            <input
              type="button"
              value="View Report"
              className=" text-white font-bold w-[150px] h-[50px] bg-[#1A8F60] ml-3 rounded-2xl p-1  "
            ></input>
          </div>
        </div>
      </div>
      <div className="h-10"></div>
      <FooterCom />
    </>
  );
};
