import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7MN3By7E1jaXDXUiv00lOTiVmwHYV1D0",
    authDomain: "dv-cwm-2023-1-ma.firebaseapp.com",
    projectId: "dv-cwm-2023-1-ma",
    storageBucket: "dv-cwm-2023-1-ma.appspot.com",
    messagingSenderId: "645645651486",
    appId: "1:645645651486:web:8f7fa75f16dd6a60d4a80f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos Firestore, a partir de la app que configuramos.
const db = getFirestore(app);

const auth = getAuth(app);

export {
    db,
    auth
}