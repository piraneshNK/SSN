import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD91T_4tH5ev1nfKcTkszGYzt5vdhA8R1o",
    authDomain: "pet-mea.firebaseapp.com",
    databaseURL: "https://pet-mea-default-rtdb.firebaseio.com",
    projectId: "pet-mea",
    storageBucket: "pet-mea.firebasestorage.app",
    messagingSenderId: "282356428335",
    appId: "1:282356428335:web:e696c7f415611a2c87e0da",
    measurementId: "G-6C9KRGMQ0L"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;
