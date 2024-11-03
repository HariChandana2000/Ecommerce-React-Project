import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "eshop-bdf68.firebaseapp.com",
  projectId: "eshop-bdf68",
  storageBucket: "eshop-bdf68.appspot.com",
  messagingSenderId: "806021401704",
  appId: "1:806021401704:web:fb3041e658337042d3ffdd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
