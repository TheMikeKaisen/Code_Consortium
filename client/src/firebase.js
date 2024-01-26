// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "coder-s-consortium.firebaseapp.com",
  projectId: "coder-s-consortium",
  storageBucket: "coder-s-consortium.appspot.com",
  messagingSenderId: "577677114441",
  appId: "1:577677114441:web:9f648862f46808eba85398"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);