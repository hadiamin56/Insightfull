import React from "react";
import { Header } from "./common/Header";
import { FooterCom } from "./common/FooterCom";

export const Insights = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center p-[45px]">
        <div>
          <h2 className="text-2xl font-rubix font-bold rubik-maintitle">
            Insights
           
          </h2>
        </div>

        <div className="">
          <p className="text-center leading-5 rubik-subtitles ">
            We facilitate clients’ ability to make decisions that are
            data-driven and well-informed. We help clients identify new trends,
            better understand markets and competitors, create strategies,
            streamline processes, and find growth opportunities.
           
            Our involvement experience includes a broad spectrum of fertilizers
            and chemicals.  <br></br>TheInsightful provides a variety of advisory
            services, including:
          </p>
        </div>
      </div>

      {/* main body */}
      <div className="main div bg-gray-100 h-[800px] p-10 ">
        <div className="container for internal divs bg-gray-100 h-[400px] gap-10 p-5 flex">
          {/* row 1 */}
          <div className="internal div row 1 w-1/2 shadow-md rounded-md border-gray-300 border h-[300px]">
            <div className="flex flex-row">
              <img
                src="/assets/report1.jpg"
                className="h-[300px] w-[280px]"
                alt="refimage"
              ></img>
              <div className="ml-6 mt-10 ">
                <p className=" text-2xl font-bold rubik-maintitle text-[#1A8F60]">
                  Thought Leadership
                </p>
                <p className=" mt-5 rubik-subtitles  ">
                  Elevating industry dialogue with insightful pespectives,
                  Guiding the conversation, shaping tomorrow's <br></br>trends.
                </p>
              </div>
            </div>
          </div>
          <div className="internal div row 2 w-1/2 shadow-md rounded-md border-gray-300 border h-[300px]">
            <div className="flex flex-row">
              <img
                src="/assets/reports2.jpg"
                className="h-[300px] w-[280px] "
                alt="refimage"
              ></img>
              <div className="ml-6 mt-10 w-[300px]">
                <p className=" text-2xl font-bold rubik-maintitle text-[#1A8F60]">Webinars</p>
                <p className=" mt-5 rubik-subtitles  ">
                  Interactive learning for today's challenges, Engage with
                  industry experts, stay ahead
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container for internal divs  bg-gray-100 h-[300px] gap-10 p-5 flex ">
          {/* row 2 */}
          <div className="internal div row 1 w-1/2  h-[300px] -my-[60px] shadow-md rounded-md border-gray-300 border">
            <div className="flex flex-row  border-gray-400">
              <img
                src="/assets/report1.jpg"
                className="h-[300px] w-[280px]"
                alt="refimage"
              ></img>
              <div className="ml-6 mt-10 ">
                <p className=" text-2xl font-bold rubik-maintitle text-[#1A8F60]">
                  Thought Leadership
                </p>
                <p className=" mt-5 rubik-subtitles  ">
                  Elevating industry dialogue with insightful pespectives,
                  Guiding the conversation, shaping tomorrow's <br></br>trends.
                </p>
              </div>
            </div>
          </div>
          <div className="internal div row 2 w-1/2  h-[300px] -my-[60px] shadow-md rounded-md border-gray-300 border">
            <div className="flex flex-row">
              <img
                src="/assets/reports2.jpg"
                className="h-[300px] w-[280px] "
                alt="refimage"
              ></img>
              <div className="ml-6 mt-10 w-[300px]">
                <p className=" text-2xl font-bold rubik-maintitle text-[#1A8F60]">Webinars</p>
                <p className=" mt-5 rubik-subtitles  ">
                  Interactive learning for today's challenges, Engage with
                  industry experts, stay ahead
                </p>
              </div>
            </div>
          </div>
        </div>





      </div>

      <FooterCom />
    </>
  );
};
