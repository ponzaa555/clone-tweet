import { SparklesIcon } from '@heroicons/react/24/outline'
import Input  from '@/components/Input'
import React, { useEffect, useState } from 'react'
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";

//  หน้านี้คือตรง post ทั้งหมด 
// flex-grow : middle component take as much space they can
// z-50 คือทับทุกอัน
function Feed() {
  const [post,setPosts] = useState([])
  // Messy way
  // useEffect(() => {
  //   const unsubscribe =  onSnapshot(
  //     query(collection(db,"posts"),orderBy("timestamp","desc")),
  //     (snapshot) => {
  //       setPosts(snapshot.docs);
  //     }
  //   )
  //   return() => {
  //     unsubscribe();
  //   };
  // },[db]);
  // CLEAN way
  useEffect(
    () =>
      onSnapshot(
        query(collection(db,"posts"), orderBy("timestamp","desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );
  return (
    // ==========================================   Posttion =======================================
    <div className=' flex-grow 
    border-l border-r border-gray-700 max-w-2xl '>
        <div className=' text-white flex items-center 
        sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b 
         border-gray-700'>
            <h2 className=' text-lg sm:text-xl font-bold'>HOME</h2>
            <div className='flex hoverAnimation w-9 h-9  items-center 
            justify-center xl:px-0 ml-auto'>
                <SparklesIcon className='h-5 text-white'/>
            </div>
        </div>
       <Input/>
       {/* // ====================================================================  Your Post =============================== */}
       <div className='pb-72'>
        {post.map(post => (
          <Post key={post.id} id ={post.id} post={post.data()}/>
        ))}
       </div>
    </div>
    
  )
}

export default Feed
//  ดู useEffect () function unsubscribes