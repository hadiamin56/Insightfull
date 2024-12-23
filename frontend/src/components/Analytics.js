import React from 'react';
import { TitlePractice } from './TitlePractice';
import { MdGroups2 } from "react-icons/md";
import { MdOutlineAutoGraph } from "react-icons/md";
import { PiMedalFill } from "react-icons/pi";
import { IoBriefcaseSharp } from "react-icons/io5";

export const Analytics = () => {
    return (
        <div className="">
            <div className='flex justify-center items-center bg-[#E0E0E0]'>
                <div className=' w-full md:w-[1050px] lg:h-[526px] px-4 md:px-[80px]'>
                    <TitlePractice />
                    <div className='flex flex-col lg:flex-row gap-10 sm:items-center justify-center '>
                        <div className='bg-white w-full md:w-full h-[209px] px-[30px] py-[40px] flex flex-col items-center justify-center mb-4 lg:mb-0'>
                            <MdGroups2 className='text-[60px] text-[#1A8F60]' />
                            <h1 className='font-bold text-[30px]'>100 +</h1>
                            <p className='text-[13px]'>Consumer Products</p>
                        </div>
                        <div className='bg-white w-full md:w-full h-[209px] px-[30px] py-[40px] flex flex-col items-center justify-center mb-4 lg:mb-0'>
                            <MdOutlineAutoGraph className='text-[60px] text-[#1A8F60]' />
                            <h1 className='font-bold text-[30px]'>181 +</h1>
                            <p className='text-[13px]'>Financial Services</p>
                        </div>
                        <div className='bg-white w-full md:w-full h-[209px] px-[30px] py-[40px] flex flex-col items-center justify-center mb-4 lg:mb-0'>
                            <PiMedalFill className='text-[60px] text-[#1A8F60]' />
                            <h1 className='font-bold text-[30px]'>98%</h1>
                            <p className='text-[13px]'>Environment</p>
                        </div>
                        <div className='bg-white w-full md:w-full h-[209px] px-[30px] py-[40px] flex flex-col items-center justify-center mb-4 lg:mb-0'>
                            <IoBriefcaseSharp className='text-[60px] text-[#1A8F60]' />
                            <h1 className='font-bold text-[30px]'>746+</h1>
                            <p className='text-[13px]'>Business & Finance</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
