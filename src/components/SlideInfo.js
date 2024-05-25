import React, { useState, useEffect, useCallback } from 'react';

export const SlideInfo = () => {
  const images = ['assets/cover.png', 'assets/cover.png', 'assets/cover.png'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(nextImage, 6000);

    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <>
      <div className="flex flex-col w-auto h-[600px] items-center gap-8 px-4 py-8 relative justify-center z-10 mt-2  " style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flex flex-col w-full items-center gap-4 px-4 py-4 relative">
          <div className="relative lg:mr-[255px] w-fit mt-[-1.00px]   text-[#006951]  text-[60px]  leading-[60px] rubik-slideinfotext ">
            First-Class Business <br />
            Consultant
          </div>
          
          <p className=" lg:mr-[480px] font-h-4 text-sm lg:text-base xl:text-lg text-black rubik-subtitles">
            We know how large objects will act, but things on a <br />
            small scale just do not act that way.
          </p>
          <div className="flex lg:mr-[540px] flex-col lg:flex-row  gap-4">
            <div className="inline-flex flex-col items-center gap-[10px] px-[36px] py-[10px] relative flex-[0_0_auto] bg-[#006951] rounded-[37px] overflow-hidden">
              <div className="relative w-fit mt-[-1.00px]  font-btn-text font-[number:var(--btn-text-font-weight)] text-white text-light-text-color text-[length:var(--btn-text-font-size)] text-center tracking-[var(--btn-text-letter-spacing)] leading-[var(--btn-text-line-height)] whitespace-nowrap [font-style:var(--btn-text-font-style)]">
                Get Quote Now
              </div>
            </div>
            <button className="inline-flex flex-col items-center gap-[10px] px-[36px] py-[10px] relative flex-[0_0_auto] rounded-[37px]   overflow-hidden border-5 border-solid border-[#006951]  all-[unset] box-border">
              <button className="relative w-fit mt-[-1.00px] font-btn-text font-[number:var(--btn-text-font-weight)] text-[#006951] rounded-[37px] text-[length:var(--btn-text-font-size)] text-center  tracking-[var(--btn-text-letter-spacing)] leading-[var(--btn-text-line-height)] whitespace-nowrap [font-style:var(--btn-text-font-style)] all-[unset] box-border">
                Learn More
              </button>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
