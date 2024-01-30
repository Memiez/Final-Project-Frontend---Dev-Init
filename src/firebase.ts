import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyALytSNO_mA7xqBuLJGLspNwqIetnhqwp8",
    authDomain: "kanban-board-54e22.firebaseapp.com",
    projectId: "kanban-board-54e22",
    storageBucket: "kanban-board-54e22.appspot.com",
    messagingSenderId: "137700587450",
    appId: "1:137700587450:web:fe2126ade5d962cb638f83",
    measurementId: "G-2LBRZVHCF3"
  };


const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export { db, collection, addDoc, updateDoc, doc, deleteDoc };
