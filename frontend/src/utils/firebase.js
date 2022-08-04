import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAuwEdSmnZ_SiQbw9yYjPzmc-QRSwEegfg',
    authDomain: 'authentication-197c6.firebaseapp.com',
    projectId: 'authentication-197c6',
    storageBucket: 'authentication-197c6.appspot.com',
    messagingSenderId: '920766907594',
    appId: '1:920766907594:web:dc96b12739bb2ba96fa033',
    measurementId: 'G-Y67F8GX5JM'
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export function signin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function signup(name, email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then((r) => {
        updateProfile(r.user, { displayName: name });
    });
}

export async function update(file, currentUser, displayName) {
    if (file != null) {
        const fileRef = ref(storage, currentUser.uid + '.png');
        await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);

        updateProfile(currentUser, { displayName, photoURL });
    } else {
        console.log(displayName);
        updateProfile(currentUser, { displayName });
    }
}

export function logout() {
    return signOut(auth);
}

// Custom Hook
export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
        return unsub;
    }, []);

    return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.png');

    setLoading(true);
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL });

    setLoading(false);
    alert('Uploaded file!');
}
