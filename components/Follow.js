import React from 'react'
import Image from "next/image";

function Follow({follow}) {
    console.log("Follow",follow)
  return (
    <div className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200  ease-out
        flex items-center'>
            <Image src={follow.userImg} width={50} height={50} objectFit='cover' className=' rounded-full'/>
            <div className=' ml-4 leading-5 group'>
                <h4 className=' font-bold group-hover:underline'>{follow.username}</h4>
                <h5 className=' text-[15px] text-gray-500'>{follow.tag}</h5>
            </div>
            <button className=' ml-auto bg-white text-black font-bold  rounded-full text-sm px-3.5 py-1.5'>Follow</button>
    </div>

  )
}

export default Follow