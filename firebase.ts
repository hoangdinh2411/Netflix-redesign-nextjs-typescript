// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
    // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWbIyB9jbD3IQNXJooqrzj0MLx3TCs6wM",
  authDomain: "netflix-clone-nextjs-f8ac1.firebaseapp.com",
  projectId: "netflix-clone-nextjs-f8ac1",
  storageBucket: "netflix-clone-nextjs-f8ac1.appspot.com",
  messagingSenderId: "30623422330",
  appId: "1:30623422330:web:0802ea4f8d9243779928c3"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const auth = getAuth()

export default app;
export {db, auth}