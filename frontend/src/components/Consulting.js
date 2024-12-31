import React from "react";
import { Header } from "./common/Header";
import { FooterCom } from "./common/FooterCom";
import { BsArrowRightSquareFill } from "react-icons/bs";

export const Consulting = () => {
  return (
    <div className="bg-cover bg-center h-full" style={{ backgroundImage: "url(assets/header.png)" }}>
      <Header />

      <div className="flex flex-col items-center justify-center p-6 md:p-12">
        <div>
          <h2 className="text-2xl md:text-2xl font-rubix font-bold rubik-maintitle">
            Consulting
          </h2>
        </div>
        <div className="max-w-7xl">
          <p className="text-center leading-7 rubik-subtitles text-md">
            We facilitate clients’ ability to make decisions that are
            data-driven and well-informed. We help clients identify new trends,
            better understand markets and competitors, create strategies,
            streamline processes, and find growth opportunities.
            Our involvement experience includes a broad spectrum of fertilizers
            and chemicals. <br></br>The Insightful provides a variety of advisory
            services, including:
          </p>
        </div>
      </div>
      
      <div className="bg-gray-200">
        <div className="container mx-auto py-12 px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-md p-6 shadow-sm shadow-[#1A8F60] flex items-center">
                <BsArrowRightSquareFill className="text-3xl text-[#1A8F60] mr-4 mb-10" />
                <div>
                  <p className="text-xl font-bold rubik-maintitle">{service.title}</p>
                  <p className="rubik-subtitles">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterCom />
    </div>
  );
};

const services = [
  {
    title: "Market analysis",
    description: "Growing demand for sustainable solutions driving market shift"
  },
  {
    title: "Strategic Planning",
    description: "Growing demand for sustainable solutions driving market shift"
  },
  {
    title: "Growth initiatives",
    description: "Growing demand for sustainable solutions driving market shift"
  },
  {
    title: "Operational improvements",
    description: "Growing demand for sustainable solutions driving market shift"
  },
  {
    title: "Bespoke Research",
    description: "Growing demand for sustainable solutions driving market shift"
  },
  {
    title: "General analysis",
    description: "Growing demand for sustainable solutions driving market shift"
  }
];
