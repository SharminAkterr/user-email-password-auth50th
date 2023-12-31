// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9ZfgJPWZ3Kh_Jf9UXicXQL5CsWOSNyk0",
    authDomain: "user-email-password-auth-45cde.firebaseapp.com",
    projectId: "user-email-password-auth-45cde",
    storageBucket: "user-email-password-auth-45cde.appspot.com",
    messagingSenderId: "195248152842",
    appId: "1:195248152842:web:1851508c30d8c72fd91af3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;