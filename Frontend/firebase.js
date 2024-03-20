// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "myblogsite-mern.firebaseapp.com",
  projectId: "myblogsite-mern",
  storageBucket: "myblogsite-mern.appspot.com",
  messagingSenderId: "340417350344",
  appId: "1:340417350344:web:273765b9a22c5d485673fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
