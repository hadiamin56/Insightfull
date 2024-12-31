import React from 'react'

export const ContactBar = () => {
  return (
    <div>
    <div className='flex flex-col lg:flex-row items-center justify-center gap-5 md:gap-10 lg:gap-[470px]'>
<div className='leading-8'>
    <div><h1 className='text-[17px] font-bold'>Consulting Agency For Your Business</h1></div>
    <div><p className='text-sm'>the quick fox jumps over the lazy dog</p></div>
</div>
<div>
<input type="botton" value="Contact Us" className='bg-[#1A8F60]  text-center items-center px-[10px] py-[14px] rounded-md text-white text-[15px] font-bold'/>
</div>


    </div>
    <div className='h-10 bg-white'></div>
    </div>
  )
}
