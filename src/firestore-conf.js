import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCy9pu0bfZ8ABSHNCSCqZSdEJ4ufNCLhfU",
    authDomain: "gameotek.firebaseapp.com",
    projectId: "gameotek",
    storageBucket: "gameotek.appspot.com",
    messagingSenderId: "650766892923",
    appId: "1:650766892923:web:b9fdc9eb3a76f4a0f2c7de"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase utils
export const db = firebase.firestore();
export const auth = firebase.default.auth();

// Firebase collections references
export const usersCollection = db.collection('users');
export const gamesCollection = db.collection('games');