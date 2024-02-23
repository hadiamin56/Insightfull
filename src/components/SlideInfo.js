import React from 'react';
import { useState, useEffect } from 'react';

export const SlideInfo = () => {
  const images = ['assets/cover.png', 'assets/cover.png', 'assets/cover.png']; // Add more image paths as needed
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to advance to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Use useEffect to create a simple automatic slideshow
  useEffect(() => {
    const interval = setInterval(nextImage, 6000); // Change slide every 3 seconds (adjust as needed)

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col w-auto h-[600px] items-center gap-8 px-4 py-8 relative justify-center z-10 mt-2  " style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flex flex-col w-full items-center gap-4 px-4 py-4 relative">
          <div className="relative lg:mr-[250px] w-fit mt-[-1.00px] font-h-1 font-[number:var(--h-1-font-weight)] text-[#006951]  text-[length:var(--h-1-font-size)]  tracking-[var(--h-1-letter-spacing)] leading-[var(--h-1-line-height)] [font-style:var(--h-1-font-style)]">
            First-Class Business <br />
            Consultant
          </div>
          
          <p className=" lg:mr-[480px] font-h-4 text-sm lg:text-base xl:text-lg text-black">
            We know how large objects will act, but things on a <br />
            small scale just do not act that way.
          </p>
          <div className="flex lg:mr-[540px] flex-col lg:flex-row  gap-4">
            <div className="inline-flex flex-col items-center gap-[10px] px-[36px] py-[10px] relative flex-[0_0_auto] bg-[#1A8F60] rounded-[37px] overflow-hidden">
              <div className="relative w-fit mt-[-1.00px] font-btn-text font-[number:var(--btn-text-font-weight)] text-light-text-color text-[length:var(--btn-text-font-size)] text-center tracking-[var(--btn-text-letter-spacing)] leading-[var(--btn-text-line-height)] whitespace-nowrap [font-style:var(--btn-text-font-style)]">
                Get Quote Now
              </div>
            </div>
            <button className="inline-flex flex-col items-center gap-[10px] px-[36px] py-[10px] relative flex-[0_0_auto] rounded-[37px]   overflow-hidden border-5 border-solid border-[#1A8F60]  all-[unset] box-border">
              <button className="relative w-fit mt-[-1.00px] font-btn-text font-[number:var(--btn-text-font-weight)] text-[#1A8F60] rounded-[37px] text-[length:var(--btn-text-font-size)] text-center  tracking-[var(--btn-text-letter-spacing)] leading-[var(--btn-text-line-height)] whitespace-nowrap [font-style:var(--btn-text-font-style)] all-[unset] box-border">
                Learn More
              </button>
            </button>
          </div>
        </div>
      </div>
         
    </>
  );
};
