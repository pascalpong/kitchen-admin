// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, RecaptchaVerifier, getAuth, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import firebaseDetails from "../../firebaseConfig.json"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = firebaseDetails;

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 
