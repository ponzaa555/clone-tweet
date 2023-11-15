import Image from "next/image";
import SidebarLink from "@/components/SidebarLink"
import {HomeIcon} from "@heroicons/react/20/solid"
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  return (
    <div className=" hidden sm:flex flex-col items-center xl:items-start 
    xl:w-[340px] p-2 relative ">
        <div className="flex items-center justify-center w-14 h-14 hoverAnimation 
        xl:ml-24 ">
            <Image src="https://rb.gy/ogau5a" width={30} height={30}/>
        </div>
        <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
            <SidebarLink  text="Home" Icon={HomeIcon} active/>
            <SidebarLink  text="Explore" Icon={HashtagIcon} />
            <SidebarLink  text="Notification" Icon={BellIcon}/>
            <SidebarLink text="Messages" Icon={InboxIcon} />
            <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarLink text="Lists" Icon={ClipboardIcon} />
            <SidebarLink text="Profile" Icon={UserIcon} />
            <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
        </div>
        <button className="hidden xl:inline ml-auto bg-[#1d9bf0] 
        text-white rounded-full
        w-56 h-[52px] text-lg shad font-bold hover:bg-[#1a8cd8] ">
          Tweet
        </button>
        <div className="  flex items-center 
        justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto text-white  ">
          <img src="https://yt3.ggpht.com/kfR3dUcwB7wKp0gNf9FR9gs_0JIcs7c9qrYJ5K-9Dpt0AWgAz3oGnxfaO0nrmlFpW-ONbh4R-Aw=s88-c-k-c0x00ffffff-no-rj" 
          alt=""
          className=" h-10 w-10 rounded-full xl:mr-2.5 "
          />
          <div className=" hidden xl:inline leading-5  ">
            <h4 className=" font-bold">firebase 1747</h4>
            <p className="text-[#6e767d]">@firebase 1747</p>
          </div>
          <EllipsisHorizontalIcon className="hidden h-5 xl:inline ml-10 text-white"/>
        </div>
    </div>
  )
}

export default Sidebar;


