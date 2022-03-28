import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtzOmwgr2Jo_0CuhLcOU1TtURgh25kmLQ",
    authDomain: "proyecto-journal-app-16578.firebaseapp.com",
    projectId: "proyecto-journal-app-16578",
    storageBucket: "proyecto-journal-app-16578.appspot.com",
    messagingSenderId: "1010657855575",
    appId: "1:1010657855575:web:7f08d06cf56bb77635fb12"
  };
  
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
    db,
    googleAuthProvider,
    firebase,
};


