import React from 'react'
import Moment from "react-moment";
import {EllipsisHorizontalIcon,
  ChartBarIcon,
  TrashIcon,
  ShareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowsRightLeftIcon,
  HeartIcon,} from "@heroicons/react/24/outline"

function Comment({id,comment}) {
  console.log(comment)
  return (
    <div className='p-3 flex cursor-pointer border-b border-gray-700'>
      <img src={comment?.userImg} className='h-11 w-11 rounded-full mr-4'/>
      <div className=' flex flex-col space-y-2 w-full '>
        <div className='flex justify-between '>
          <div className=' text-[#6e767d]'>
            <div className=' inline-block group'>
              <h4 className='font-bold text-white text[15px] sm:text-sm inline-block group-hover:underline'>
                {comment.username}
              </h4>
            </div>{" "}·{" "} 
            <span className=" hover:underline text-sm sm:text-[15px] pt-0.5">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p>{comment?.comment}</p>
          </div>
          <div className=" icon group flex-shrink-0 ml-auto">
            <EllipsisHorizontalIcon className="h-5 text-[#6e767d]  group-hover:text-[#1d9bf0]"/>
          </div>
        </div>
        <div className='flex justify-between space-x-1 group  w-11/12  ' >
            <div className="icon group">
              <ChatBubbleOvalLeftEllipsisIcon className="h-5 hover:text-[#1d9bf0] text-[#6e767d]"/>
            </div>
            <div>
              <ArrowsRightLeftIcon className='h-5 hover:text-[#1d9bf0] text-[#6e767d]'/>
            </div>
            <div>
              <HeartIcon className='h-5 hover:text-[#1d9bf0] text-[#6e767d]'/>
            </div>
            <div>
              <ShareIcon className='h-5 hover:text-[#1d9bf0] text-[#6e767d]' />
            </div>
            <div>
              <ChartBarIcon className='h-5 hover:text-[#1d9bf0] text-[#6e767d]'/>
            </div>
        </div>
      </div>
    </div>
  )
}
export default Comment;