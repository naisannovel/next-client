import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from '../../firebase.config';
import 'firebase/auth';

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();


export const createAccount = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
  };
