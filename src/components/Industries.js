import React from 'react'
import { Header } from './common/Header'
import { FooterCom } from './common/FooterCom'
import { Industriescards } from './Industriescards'
// import SearchBar from './Searchbar'
export const Industries = () => {
  return (
    <>
        <div  className='bg-cover bg-center h-230' style={{backgroundImage: 'url(assets/header.png)'}}>

    <Header/>
    <div> <div className="flex flex-col items-center justify-center p-[45px]">
      <div>
        <h2 className="text-2xl font-rubix font-bold rubik-maintitle">Industries</h2>
      </div>
      <div className="">
        <p className="text-center leading-5 rubik-subtitle">
          Problems trying to resolve the conflict between<br></br> the two major realms
          of Classical physics: Newtonian mechanics
        </p>
      </div>
    </div></div>
    </div>
    <Industriescards/>
    {/* <SearchBar/> */}
   <FooterCom/>
    </>
  )
}
