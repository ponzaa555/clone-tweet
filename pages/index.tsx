import Sidebar from "../components/Sidebar";
import Head  from "next/head";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/facicon." />
      </Head>

       <main className=" bg-black flex max-w-[1500px] mx-auto min-h-screen">
        <Sidebar/>
        {/* Feed */}
        {/* Widgets */}

        {/* Modal */}
      </main>
    </div>
  );
} 
