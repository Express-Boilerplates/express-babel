import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBThRmOdFBV3zTcrSn8-0k0m65A2442eA",
  authDomain: "knock-gift-card.firebaseapp.com",
  databaseURL: "https://knock-gift-card.firebaseio.com",
  projectId: "knock-gift-card",
  storageBucket: "knock-gift-card.appspot.com",
  messagingSenderId: "982589331302",
  appId: "1:982589331302:web:ea901498976156fec91aa7",
  measurementId: "G-ED770807LM"
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();

export default app;
