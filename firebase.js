import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBe0pWIQpA8IxkYCvw9FLsaao39Z0I0IIo",
    authDomain: "twitter-clone-yt-d8cb9.firebaseapp.com",
    projectId: "twitter-clone-yt-d8cb9",
    storageBucket: "twitter-clone-yt-d8cb9.appspot.com",
    messagingSenderId: "744544966995",
    appId: "1:744544966995:web:fb48a84b440d211a9ea9a6"
  };

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore();
  const storage = getStorage();
  
  export default app;
  export { db, storage };