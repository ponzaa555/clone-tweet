import React from 'react'
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline"
import Trending from "./Trending"
import Follow from "./Follow"


function Widgets({trendingResults,followResults }) {
  return (
    <div className='hidden lg:inline ml-8 xl:w-[450px] py-5 space-y-5'>
      <div className=' sticky top-0 py-1 bg-black z-50 w-11/12  xl:w-9/12'>
        <div className=' flex items-center bg-[#1c1e20] p-3 rounded-full relative'>
          <MagnifyingGlassIcon className=' text-gray-500 h-5 z-50'/>
          <input type='text' className=' bg-transparent placeholder-gray-500 outline-none
          text-white absolute inset-0 border border-transparent w-full pl-11 focus:border-[#1d9bf0] focus:bg-black
           focus:shadow-lg focus:rounded-full'
          placeholder='Search Twitter'/>
        </div>
      </div>
      <div className=' text-white bg-[#1c1e20] pl-2 space-y-3 rounded-xl w-11/12
       xl:w-9/12'>
        <h4 className=' font-bold text-xl px-4'>What happening</h4>
        {trendingResults.map((result,index) => (
          <Trending key={index} result={result}/>
        ))}
        <button className=' hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200  ease-out
        flex items-center justify-between
         w-full text-[#1d9bf0] font-light'
         onClick={() => console.log(trendingResults)}>Show more</button>
      </div>
      <div className=' text-white bg-[#1c1e20] pl-2 space-y-3 rounded-xl w-11/12
        xl:w-9/12'>
        <h4 className=' font-bold text-xl px-4'>Who to Follow</h4>
        {followResults.map((follow,index) => (
          <Follow key={index} follow={follow}/>
        ))}
        <button className=' hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200  ease-out
        flex items-center justify-between
         w-full text-[#1d9bf0] font-light'
         onClick={() => console.log(trendingResults)}>Show more</button>
      </div>
    </div>
  )
}

export default Widgets