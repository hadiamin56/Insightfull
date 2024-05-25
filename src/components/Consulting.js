import React from 'react'
import { Header } from './common/Header'
export const Consulting = () => {
  return (
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
  )
}
