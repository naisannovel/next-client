import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from "firebase/auth";
import { firebaseConfig } from '../../firebase.config';
import 'firebase/auth';

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();


// sign up with email and password

export const userInfo = () => {
    const user = auth.currentUser;
    return user;
}

export const updateUser = name => {
    updateProfile(auth.currentUser, {
        displayName: name
    }).then(() => {
        userInfo();
    }).catch((error) => {});
}

export const userCreateWithEmailAndPassword = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            updateUser(name);
        })
        .catch((error) => {
            console.log(error);
        });
}

// sign in with email and password

export const userLoginWithEmailAndPassword = (email,password) =>{
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            console.log(error.message);
        });
}

// sign in with google

export const createAccountWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            return result;
        }).catch((error) => {
            console.log(error);
        });
};

export const logout = () => {
    signOut(auth).then(() => {
        console.log('logout');
    }).catch((error) => {
        console.log(error);
    });
}
