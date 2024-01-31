import {EllipsisHorizontalIcon,
        ChartBarIcon,
        TrashIcon,
        ShareIcon,
        ChatBubbleOvalLeftEllipsisIcon,
        ArrowsRightLeftIcon,
        HeartIcon,} from "@heroicons/react/24/outline"
import {
          collection,
          deleteDoc,
          doc,
          onSnapshot,
          orderBy,
          query,
          setDoc,
        } from "@firebase/firestore";
import { useEffect, useState } from "react"
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import {modalState,postIdState} from "../atoms/modalAtom"
import { useRouter } from "next/router";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";
// group กับ group-hover:underline 
//  ใช้ group ที่ parent พอ hover ตรงไหนก็ตาม จะ hover หมด
//  icon class เราสร้างไว้ก่อนแล้ว
//  rounter 
// e.stopPropagation() ให้บางส่ง ของ div ไม่โดน onclick
function Post ({id,post, postPage}) {
  const {data:session} = useSession();
  const [isOpen,setIsOpen] = useRecoilState(modalState);
  const [postId,setPostId] = useRecoilState(postIdState);
  const [comment,setComment] = useState([]);
  const [likes,setLikes] = useState([]);
  const [liked ,setLiked] = useState(false);
  const router = useRouter();


  useEffect(() => {
    onSnapshot(
      query(
        collection(db,"posts",id,"comments"),
        orderBy("timestamp","desc")
    ),
    (snapshot) => setComment(snapshot.docs)
    )},[db,id]
  )

  useEffect(() => {
    setLiked(
      likes.findIndex((like) => like.id === session.user.uid ) !== -1 
    )
  },[likes]
  )

  useEffect(() => {
      console.log("like.findeIndex",likes.findIndex((like) => like.id === session?.user?.uid) )
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      )
    },[id,db]
  );

  


  // ========================================================================     สำคัญ   ======================================================
  
  const likePost = async() =>{
    //  delet doc
    if(liked){
      await deleteDoc(doc(db,"posts",id,"likes",session.user.uid))
    }else{
      // create collection of like 
      await setDoc(doc(db,"posts",id,"likes",session.user.uid),{
        username:session.user.name,
      });
    }
  };

    // ========================================================================     สำคัญ   ======================================================
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700"
    onClick={() => router.push(`/${id}`)}>
      {!postPage && (
        <img src={post?.userImg}  alt="" className="h-11 w-11 rounded-full mr-4"/>
      )}
      <div className=" flex flex-col space-y-2 w-full">
        {/* Profile */}
        <div className={` flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img src={post?.userImg} 
            alt="Profile Pic"
            className=" h-11 w-11 rounded-full mr-4"/>
          )}
          {/* Username tag time stamp */}
          <div className=" text-[#6e767d]">
            <div className=" inline-block group">
              <h4 className={` font-bold text-[15px] sm:text-base text-[#d9d9d9] 
              group-hover:underline ${!postPage && "inline-block"}`}>{post?.username}</h4>
              <span className={` text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}>@{post?.tag}</span>
            </div>{" "}
            ·{" "}<span className=" hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
            {!postPage &&(
              <p className="text-[#d9d9d9] text-[15px] sm:text-base ">
                {post?.text}
              </p>
            )}
          </div>
          <div className=" icon group flex-shrink-0 ml-auto">
            <EllipsisHorizontalIcon className="h-5 text-[#6e767d]"/>
          </div>
        </div>
        {postPage && (
          <p className=" text-[#d9d9d9] text-[15px] sm:text-base">
            {post?.text}
          </p>
        )}
        <img 
        src={post?.image} 
        alt="" 
        className=" rounded-2xl max-h-[700px] object-cover mr-2 "/>
        <div className={` text-[#6e767d] flex justify-between w-10/12 ${postPage && "mx-auto"}`}>
          <div className="flex items-center space-x-1 group"
          onClick={(e) => {
            e.stopPropagation();
            setPostId(id);
            setIsOpen(true);
          }}>
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatBubbleOvalLeftEllipsisIcon className="h-5 group-hover:text-[#1d9bf0]"/>
            </div>
            {comment.length > 0 && (
              <span className=" group-hover:text-[#1d9bf0] text-sm">
                {comment.length}
              </span>
            )}
          </div>
          {/* Delet จะมีแค่ post ของตัวเองดังนั้นต้อง ใช้ session match ตรงไหม */}
          {/* ถ้าใช่ทำกรณี บน ถ้าไมทำกรณีล่าง  */}
          
          {session.user.uid === post?.id ? (
            <div className="flex items-center space-x-1 group"
            onClick={(e) =>{
              e.stopPropagation();
              deleteDoc(doc(db,"posts",id))
              router.push("/");
            }}>
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className=" h-5 group-hover:text-red-600"/>
              </div>
            </div>
          ): (
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <ArrowsRightLeftIcon className="h-5  group-hover:text-green-500"/>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}>
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-pink-600">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
                <div>
                  <HeartIcon className="h-5 group-hover:text-pink-600"/>
                </div>
              )}
            </div>
            {likes.length > 0 && (
              <span className={` group-hover:text-pink-600 text-sm ${liked && "text-pink-600"}`}>
                {likes.length}
              </span>
            )}
          </div>
          <div className="icon group">
            <ShareIcon className=" h-5 group-hover:text-[#1d9bf0]"/>
          </div>
          <div className="icon group">
            <ChartBarIcon className=" h-5 group-hover:text-[#1d9bf0]"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

// 5/12/2023 แก้ delete และ กด like 
// <Moment fromNow>{post?.timestamp?.toDate()}</Moment>