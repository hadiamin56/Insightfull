import React from "react";
import { Header } from "./common/Header";
import { FooterCom } from "./common/FooterCom";

export const Joinus = () => {
  return (
    <>
      <div
        className="bg-cover bg-center h-full"
        style={{ backgroundImage: "url(assets/header.png)" }}
      >
        <Header />
        {/* what we offer */}
        <div className="flex flex-col items-center justify-center p-[45px]">
          <div>
            <h2 className="text-2xl font-rubix font-bold">Join Us</h2>
          </div>
          <div className="">
            <p className="text-center leading-5">
              Problems trying to resolve the conflict between <br></br>
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
        </div>
      </div>

      <div className=" ">
        <div className="bg-gray-200 h-[400px] flex flex-row p-6 gap-2">
          <div className="w-1/3 bg-[#1A8F60] text-center flex items-center justify-center  shadow-sm">
            <p className="text-4xl rubik-maintitle text-[#1A8F60] bg-white p-2 rounded-md">
              WHAT WE OFFER
            </p>
          </div>

          <div className="w-1/4 bg-[#1A8F60]  flex flex-col">
            <div className="">
              <img
                src="/assets/report1.jpg"
                className="h-[350px]"
                alt="image"
              ></img>
            </div>
            <div className="bg-[#1A8F60] h-10 w-[300px] -my-12 flex items-center justify-center">
              <p className="text-white text-xl font-bold rubik-maintitle">
                Consultancy
              </p>
            </div>
          </div>

          <div className="w-1/4 bg-[#1A8F60] border flex flex-col">
            <div className="">
              <img
                src="/assets/report1.jpg"
                className="h-[350px]"
                alt="image"
              ></img>
            </div>
            <div className="bg-[#1A8F60] h-10 w-[300px] -my-12 flex items-center justify-center">
              <p className="text-white text-xl font-bold rubik-maintitle">
                Insights
              </p>
            </div>
          </div>
          <div className="w-1/4 bg-[#1A8F60] border flex flex-col">
            <div className="">
              <img
                src="/assets/report1.jpg"
                className="h-[350px]"
                alt="image"
              ></img>
            </div>
            <div className="bg-[#1A8F60] h-10 w-[300px] -my-12 flex items-center justify-center">
              <p className="text-white text-xl font-bold rubik-maintitle">
                Reports
              </p>
            </div>
          </div>
        </div>

        <div className="h-[500px]  flex flex-col items-center  mt-4 gap-4 ">
          <p className=" text-2xl rubik-maintitle">Career path</p>
          <div className="flex flex-row border border-1 border-gray-300 shadow-sm rounded-sm">
            <div className="bg-white h-[400px] w-[600px]  flex-col flex justify-center items-center text-center rubik-subtitles text-md p-4">
              <p className="text-xl rubik-maintitle">Consulting</p>
              <br></br>
              <p>
                In the dynamic realm of consulting, every challenge presents an
                opportunity to innovate and strategize. Consultants are the
                architects of change, wielding their expertise to navigate
                complexities and illuminate pathways to success. From advising
                Fortune 500 companies on market expansion to guiding startups
                through critical growth phases, consulting transcends industries
                and borders, fostering resilience and adaptability in the face
                of uncertainty.{" "}
              </p>
            </div>
            <div className="bg-[#1A8F60] h-[400px] w-[600px] text-white flex flex-col justify-center items-center text-center rubik-subtitles text-md p-4">
              <p className="text-xl rubik-maintitle">Research</p>
              <br></br>
              <p>
                Research is the cornerstone of progress, a relentless pursuit of
                understanding that fuels innovation and drives discovery across
                disciplines. It is a systematic exploration of the unknown,
                guided by curiosity and fueled by a thirst for knowledge. From
                unraveling the mysteries of the universe to addressing pressing
                societal challenges, research illuminates new frontiers and
                expands the boundaries of human understanding.
              </p>
            </div>
          </div>
        </div>
        <div className="text-white border border-1 bg-[#1A8F60] h-[300px] flex items-center justify-center">
          <div className="">
            <p className="rubik-maintitle text-3xl">Our Culture</p>
            <p className="rubik-subtitle ml-3">Details to be added</p>
          </div>
        </div>
        <div className="text-[#1A8F60] border border-1 bg-white h-[300px] flex items-center justify-center">
          <div className="">
            <p className="rubik-maintitle text-3xl">Our Culture</p>
            <p className="rubik-subtitle ml-3">Details to be added</p>
          </div>
        </div>

      </div>
      <FooterCom />
    </>
  );
};
