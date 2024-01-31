import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useRef, useState } from 'react'
import {PhotoIcon,
        ChartBarIcon,
        FaceSmileIcon,
        CalendarIcon} from '@heroicons/react/24/outline';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useSession } from 'next-auth/react';
function Input() {

    const {data:session} = useSession()
    const [input,setInput] = useState("");
    const [selectedFile,setselectedFile] = useState(null);
    const filePickerRef = useRef(null);
    const [showEmojis,setShowEmojis] = useState(false);
    const [loading,setLoading] = useState(false)


    // ========================================== Backend มาดูซ้ำ ================================================================================
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) =>{
            setselectedFile(readerEvent.target.result);
        }
        // function ทำหน้าที่ show image on post ถ้าไม่มี function นี้ต้อน input type file แล้วเลือกไฟล์จะได้เป็น url
        // Problem  upload รูปเดิมหลังรบไม่ได้
    }

    // =============================================================================================================================================


    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
      };


    // ======================================================   Backend มาดูซ้ำ =======================================================================
    const sendPost = async() =>{
        if(loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db,'posts'),{
            id: session.user.uid,
            username: session.user.name,
            userImg: session.user.image,
            tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp(),
        });

        const imagesRef = ref(storage,`posts/${docRef.id}/image`);

        if(selectedFile){
            await uploadString(imagesRef,selectedFile,"data_url").then(async () => {
                const downloadURL = await getDownloadURL(imagesRef);
                await updateDoc(doc(db,"posts",docRef.id), {
                    image: downloadURL,
                });
            });
        }
        console.log("session:",session)
        setLoading(false);
        setInput("");
        setselectedFile(null);
        setShowEmojis(false);
    }
    //  ======================================================================================================================================================
  return (
    <div className={` border-b border-gray-700 p-3 gap-x-3  
         overflow-y-hidden flex text-white ${loading && "opacity-60"}`}
    >
        <img src= {session.user.image}
        alt=''
        className='h-11 w-11 rounded-full cursor-pointer'/>
        <div className='w-full divide-y divide-gray-700'>
            <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                <textarea 
                value={input} rows="2" 
                onChange={(e) => setInput(e.target.value)}
                className=' bg-transparent  
                outline-none text-white text-lg  placeholder-gray-500 tracking-wide 
                min-h-[50px] w-full' 
                placeholder="What's happening?"
            />
        {selectedFile && (
             <div className=' relative'>
                <div className=' absolute w-8 h-8 bg-[#15181c] 
                hover:bg-[#272c26] bg-opacity-75 rounded-full 
                flex items-center justify-center top-1 left-1 cursor-pointer'
                onClick={() => setselectedFile(null)}>
                    <XMarkIcon className=" text-white h-5"/>
                </div>
                <img 
                src={selectedFile}
                className=' rounded-2xl max-h-80 object-contain'/>
            </div>
            )} 
        </div>
        {/* ************************ทำให้กด ตรง PhotoIcon แทน ต้องไปกด inpit *********  */}
     {!loading && (
        <div className='flex items-center justify-between pt-2.5   '>
            <div className='flex items-center '>
                <div className='icon' onClick={() => filePickerRef.current.click()}>
                    <PhotoIcon className='h-[24px] text-[#1d9bf0]'/>
                    <input type='file' 
                    hidden
                    onChange={addImageToPost} 
                    ref={filePickerRef}/>
                </div>
                <div className='icon rotate-90'>
                    <ChartBarIcon  className='h-[24px] text-[#1d9bf0]'/>
                </div>
                <div className='icon' onClick={() => setShowEmojis(!showEmojis)}>
                    <FaceSmileIcon className='h-[24px] text-[#1d9bf0]'/>
                </div>
                <div>
                    <CalendarIcon className='h-[24px] text-[#1d9bf0]'/>
                </div>
                <div className=' absolute mt-[465px] max-w-[320px]  '>
                {showEmojis && (
                    <Picker
                    data = {data}
                    theme = "dark"
                    emojiButtonSize = {32}
                    onEmojiSelect = {addEmoji}
                    emojiSize ={22}
                    // emojiButtonRadius
                        />
                    )}
                </div>
            </div>
            <button className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5
                font-bold shadow-lg hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0]
                disabled:opacity-50 disabled:cursor-default'
                disabled ={!input.trim() && !selectedFile}
                onClick={sendPost}>Tweet
            </button>
        </div>
     )}
    </div>
</div>
  )
}

export default Input 
// disable 
// .trim()
//npm install next-auth