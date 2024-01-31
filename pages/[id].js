import Modal from "../components/Modal"
import Head  from "next/head";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets"
import { useSession,getProviders,getSession} from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Login from "../components/Login"
import {ArrowLeftIcon} from "@heroicons/react/24/outline"
import Post from "../components/Post"
import Comment from "../components/Comment"
function Postpage({trendingResults,followResults,providers}){
  const {data:session} = useSession();
  const [isOpen,setIsOpen] = useRecoilState(modalState)
  const router = useRouter();
  const [post,setPost] = useState();
  const {id} = router.query
  const [comment,setComment] = useState([]);
  // 
  
  useEffect( () => {
    onSnapshot(doc(db,"posts",id),
    (snapshot) =>{
      setPost(snapshot.data())
    })
  },[db])

  useEffect(() => {
    onSnapshot(
      query(
        collection(db,"posts",id,"comments"),
        orderBy("timestamp","desc")
      ),
      (snapshot) => setComment(snapshot.docs)
    )
  },[db,id])
  if (!session) return <Login providers={providers}/>;

  return (
    <div className=''>
      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"  {/* กำหนดชื่อ tab ด้านบน */}
        </title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>

      <main className=' bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar/>
        {/* Widets */}
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl xl:ml-8">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-white font-semibold text-xl gap-x-4 top-0 z-50 bg-black">
            <div 
              className="hoverAnimation w-9 h-9 justify-center items-center xl:px-0"
              onClick={() => router.push("/")}>
              <ArrowLeftIcon className=" text-white h-5"/>
            </div>
            Tweet
          </div>
          <Post id={id} post={post} postPage/>
          {comment.length>0 && (
            <div className="pb-72">
              {comment.map((comment) =>(
                <Comment
                  key={comment.id}
                  id={comment.id}
                  comment={comment.data()}/>
              ))}
            </div>
          )}
        </div>
        <Widgets trendingResults = {trendingResults} followResults ={followResults}/>
        {isOpen && <Modal/>}
      </main>
    </div>
  )
}

export default Postpage;

export async function getServerSideProps(context) {
  const fetch = require("node-fetch");
  const https = require('https');
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  const trendingResults = await fetch(
  "https://jsonkeeper.com/b/NKEV",
  {agent: httpsAgent,}).then(
    (res) => res.json()
  );
  const followResults = await fetch(
    "https://jsonkeeper.com/b/WWMJ",
    {agent: httpsAgent,},
  ).then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);
  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}