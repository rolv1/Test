import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDG0xkZLCJ1JYxBWfFw_lXW3ChOac0Y8QE",
    authDomain: "test-2fb63.firebaseapp.com",
    projectId: "test-2fb63",
    storageBucket: "test-2fb63.appspot.com",
    messagingSenderId: "345288558587",
    appId: "1:345288558587:web:beeea43981ced197f2ad5e"
};

firebase.initializeApp(firebaseConfig);

export default firebase;