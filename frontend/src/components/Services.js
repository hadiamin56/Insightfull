import React from 'react'
export const Services = () => {
  return (
    <>
    
    <h1 className='ml-[380px] underline text-3xl mt-2' >Our Business - addressing all our client needs</h1>
    <div className='h-6'></div>
    <div className='flex gap-10 items-center justify-center'>

    <div className="w-[300px]  rounded overflow-hidden shadow-lg">
      <img className="w-full" src="https://www.nexanteca.com/sites/default/files/Depositphotos_Consulting.jpg" alt="Card" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Consulting</div>
        <p className="text-gray-700 text-sm">
        We advise on projects ranging from hydrocarbon resource master planning, through project implementation in refining, gas processing and petrochemicals and fertilizers. To on-going business optimisation support, dispute resolution and transaction support in M&A or disposal situations and much
        </p>
      </div>
      <div className="px-2 pt-4 pb-2">
        <button className="bg-green-500  text-white font-bold py-2 px-4 rounded">
        View More
        </button>
      </div>
    </div>
    <div className="w-[300px] rounded overflow-hidden shadow-lg">
      <img className="w-full" src="https://www.nexanteca.com/sites/default/files/Depositphotos_54787101_xl-2015.jpg" alt="Card" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Subscriptions and Reports</div>
        <p className="text-gray-700 text-sm">
        We provide clients with comprehensive analytics, forecasts and insights for the chemicals, polymers, energy and cleantech industries. Using a combination of business and technical expertise, with deep and broad understanding of markets, technologies and economics, NexantECA provides solutions that our clients rely upon.
        </p>
      </div>
      <div className="px-2 pt-4 pb-2">
        <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View More
        </button>
      </div>
    </div>
    <div className="w-[300px] rounded overflow-hidden shadow-lg">
      <img className="w-full" src="https://www.nexanteca.com/sites/default/files/training.jpg" alt="Card" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Training</div>
        <p className="text-gray-700 text-sm">
        Our industry leading Online, Public and In-House Petrochemical & Energy training courses have trained over 10,000 Chemical industry professionals globally for more than 30 years. Our training courses and workshops cover today’s fast moving chemical industry, including the whole value chain, from refined products 
        </p>
      </div>
      <div className="px-2 pt-4 pb-2 ">
        <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View More
        </button>
      </div>
    </div>
  
    </div>
    <div className='h-10'></div>
    </>
  )
}
