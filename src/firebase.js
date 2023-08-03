import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBIDIexQbKZfysrmhhT3p3Ql2E4Ny32eeI",
  authDomain: "wdydff.firebaseapp.com",
  projectId: "wdydff",
  storageBucket: "wdydff.appspot.com",
  messagingSenderId: "428190802753",
  appId: "1:428190802753:web:a4581478ad21bd555577c0",
  measurementId: "G-R55WELKY7X"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export { firebase, db };