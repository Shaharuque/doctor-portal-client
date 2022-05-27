// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLznREeEl18VidcGiItxe-tA9EqvPxH2w",
    authDomain: "doctor-s-portal-37d0f.firebaseapp.com",
    projectId: "doctor-s-portal-37d0f",
    storageBucket: "doctor-s-portal-37d0f.appspot.com",
    messagingSenderId: "828774688361",
    appId: "1:828774688361:web:e919580aef4fca0c17e4f8",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
export default auth ;