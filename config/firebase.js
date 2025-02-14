import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCpWI_HWbfKk6La4hG_ILEPXvgNj__NbyE",
    authDomain: "ksa4sale-classified.firebaseapp.com",
    projectId: "ksa4sale-classified",
    storageBucket: "ksa4sale-classified.firebasestorage.app",
    messagingSenderId: "909499598820",
    appId: "1:909499598820:web:2d2e057f79a6d1630969f1",
    measurementId: "G-J9L2V8EW22"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;