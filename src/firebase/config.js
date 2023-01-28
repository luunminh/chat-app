// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/compat/app";
import { getAnalytics } from "firebase/compat/analytics";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCL6BoqhRk6TTG6Ulfx6DoUponR6yqwVeY",
    authDomain: "chat-app-16717.firebaseapp.com",
    projectId: "chat-app-16717",
    storageBucket: "chat-app-16717.appspot.com",
    messagingSenderId: "126072278404",
    appId: "1:126072278404:web:bfe23202b33c09c3f6a1d1",
    measurementId: "G-S6L83MCY90"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', '8080');
}

export { auth, db }

export default firebase;