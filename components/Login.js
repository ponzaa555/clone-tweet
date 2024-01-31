import { signIn } from "next-auth/react";
import Image from "next/image";
//  ที่ต้องดู object.valuse() , map() ,function SingIn ไปอ่าน doc ,callbackUrl: "/"
//  แก้ could console => APIs & services => OAuth 2.0 Client IDs 
//  เพิ่ท url Authorized JavaScript origins
//  เพิ่ม url Authorized redirect URIs


const Login = ({providers}) => {
  return (
    <div className=' flex flex-col items-center pt-48 space-y-20'>
      {/* Logo */}
      <Image
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        objectFit="contain"
      />
      <div>
        {Object.values(providers).map(provider =>(
          <div key={provider.name}> 
             <button
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1d9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign in with {provider.name}
              </span>
              </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Login;
// Object.values(provides) เปลี่ยนเป็น array
// https://devdojo.com/tailwindcss/buttons#_  web สำหรับหา button css