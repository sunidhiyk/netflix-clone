
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyA0slP4zry382B4hzRn_5qWGd8Ggc3L1mo",
  authDomain: "netflix-clone-ddc48.firebaseapp.com",
  projectId: "netflix-clone-ddc48",
  storageBucket: "netflix-clone-ddc48.appspot.com",
  messagingSenderId: "1055893866917",
  appId: "1:1055893866917:web:7a357145bafdf96d4e404c",
  measurementId: "G-376MB30D3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async( name, email, password)=>{
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch(error){
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}
 
const login = async (email, password)=>{
   try{
     await signInWithEmailAndPassword(auth, email, password);
   }catch(error){
     console.log(error);
     toast.error(error.code);
   }
}

const logout = ()=>{
  signOut(auth);
}

export {auth, db, login, signup, logout};