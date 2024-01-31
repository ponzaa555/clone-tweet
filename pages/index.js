import Sidebar from "../components/Sidebar";
import Head  from "next/head";
import Feed from "@/components/Feed"
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "@/components/Login"
import Modal from "@/components/Modal"
import { useRecoilState } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import Widgets from "@/components/Widgets"

//  session อ่าน doc
// ละดูตัวอย่างหน้า api/auth/[...nextauth.js],env.local, function getServerSideProps(context) 
//  ต้องทำ session เป็น สำคัญมาก


export default function Home({trendingResults,followResults,providers }) {
  const {data: session} = useSession();
  const [isOpen,setIsOpen] = useRecoilState(modalState)
  if (!session) return <Login providers={providers}/>
  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/facicon." />
      </Head>

       <main className=" bg-black flex max-w-[1500px] mx-auto min-h-screen">
        <Sidebar/>
        <Feed />
        <Widgets trendingResults = {trendingResults} followResults ={followResults}/>

        { isOpen &&<Modal/>}
      </main>
    </div>
  );
} 

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
// Node.js Hostname/IP doesn't match certificate's altnames ปัฐหาที่เจอ
// แก้โดย const fetch = require("node-fetch");
//   const https = require('https');
//   const httpsAgent = new https.Agent({
//     rejectUnauthorized: false,
//   });
// const session = await getSession(context); แก้ปัญหา ถ้ากดload หน้าหลัง login แล้วเด้งกลับไปหน้า login แพ้บนึง เหมือนที่เคยเป็นตอนทำหน้า profile *** await getSession(context) แก้ได้ๆ