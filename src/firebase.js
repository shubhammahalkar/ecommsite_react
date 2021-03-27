import  firebase from "firebase/app"
import 'firebase/auth';
import 'firebase/firestore'
 
 const firebaseConfig = {
    apiKey: "AIzaSyBOroKk91Yns8Y4vxa4sGPtpE2YzkL3hpk",
    authDomain: "my-mall-2c858.firebaseapp.com",
    projectId: "my-mall-2c858",
    storageBucket: "my-mall-2c858.appspot.com",
    messagingSenderId: "747934024417",
    appId: "1:747934024417:web:9b7a008224f397dd1aeda0",
    measurementId: "G-RXRT9SM2LW"
  };
  
  firebase.initializeApp(firebaseConfig);

  export const firebaseAuth = firebase.auth()

  export const firestore = firebase.firestore();

  export default firebase;