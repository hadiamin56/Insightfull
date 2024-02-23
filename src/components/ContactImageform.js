import React from 'react'
import { ContactForm } from './_auth/ContactForm'

export const ContactImageform = () => {
  return (
    <div className='flex flex-row p-10 items-center justify-center  gap-10'>
        <div className='w-1/2 shadow-sm shadow-gray-500'><img src="assets/9.png"/></div>
        <div className='w-1/2 shadow-sm shadow-gray-500 h-[595px]'><ContactForm/></div>
    </div>
  )
}
