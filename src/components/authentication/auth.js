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
import jwt_decode from 'jwt-decode';
import _ from 'lodash';

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

// token save in localStorage
const setTokenInLocalStorage = token =>{
    localStorage.setItem('token',JSON.stringify(token));
    const { exp } = jwt_decode(token);
    const expirationTime = new Date(exp * 1000);
    localStorage.setItem('expirationTime',expirationTime);
}

// sign up with email and password

export const userInfo = async () => {
    const user = await auth.currentUser;
    setTokenInLocalStorage(user.accessToken);
    const userData = _.pick(user,['displayName','email']);
    return userData;
}

export const updateUser = async (name) => {
    return await updateProfile(auth.currentUser, {
        displayName: name
    }).then((res) => {
        return userInfo();
    }).catch((error) => {
        return error
    });
}

export const userCreateWithEmailAndPassword = async (email, password, name) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return updateUser(name);
        })
        .catch((error) => {
            return error;
        });
}

// sign in with email and password

export const userLoginWithEmailAndPassword = async (email,password) =>{
    return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setTokenInLocalStorage(userCredential.user.accessToken);
            const user = _.pick(userCredential.user,['displayName','email']);
            return user;
        })
        .catch((error) => {
            return error
        });
}

// sign in with google

export const createAccountWithGoogle = async () => {
   return await signInWithPopup(auth, provider)
        .then((result) => {
            setTokenInLocalStorage(result.user.accessToken);
            const user = _.pick(result.user,['displayName','email']);
            return user;
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
