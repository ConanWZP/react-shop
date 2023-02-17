// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJzBGzWN-3nQ04aNwowWAP531PDZbSBKM",
    authDomain: "react-shop-6a02d.firebaseapp.com",
    projectId: "react-shop-6a02d",
    storageBucket: "react-shop-6a02d.appspot.com",
    messagingSenderId: "353984450817",
    appId: "1:353984450817:web:44c176061189408142cb00"
};

// Initialize Firebase
initializeApp(firebaseConfig);


export const database = getFirestore()
export const auth = getAuth();
export const storage = getStorage()