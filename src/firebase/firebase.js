import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBRHvtSuAICZh4rjbbDCkE97PW57uAApek",
    authDomain: "shopping-2d05c.firebaseapp.com",
    projectId: "shopping-2d05c",
    storageBucket: "shopping-2d05c.appspot.com",
    messagingSenderId: "1633630794",
    appId: "1:1633630794:web:afd4bcad24fe1d6d4cc4b3"
  };
  // Initialize Firebase
  let firebaseApp = firebase.initializeApp(firebaseConfig);
  let fireStore = firebaseApp.firestore();

  export default fireStore ;