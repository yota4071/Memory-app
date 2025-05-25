// services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIdf8WkZ43JSMfY_OkGnrNNbwsaCGaWu8",
  authDomain: "memory-app-a6921.firebaseapp.com",
  projectId: "memory-app-a6921",
  storageBucket: "memory-app-a6921.appspot.app.com",
  messagingSenderId: "499101015937",
  appId: "1:499101015937:web:d26875a4829e76a2fed280",
  measurementId: "G-EK0GT63BPC"
};

// Firebase を初期化
const app = initializeApp(firebaseConfig);

// Firestore データベースを取得
export const db = getFirestore(app);

export default app;