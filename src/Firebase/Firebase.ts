import { initializeApp } from "firebase/app";
 import {getAuth} from "firebase/auth"
 import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCFj_nkIyQyMhxcAw1vgh7tLwYyL0AZF6w",
  authDomain: "gym-training-3aeed.firebaseapp.com",
  projectId: "gym-training-3aeed",
  storageBucket: "gym-training-3aeed.firebasestorage.app",
  messagingSenderId: "202904047382",
  appId: "1:202904047382:web:13fb854a4cdb28d9064a37"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
export {auth , db}