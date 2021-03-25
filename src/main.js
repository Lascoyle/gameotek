import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import './assets/tailwind.css'
import moment from 'moment'

// Global access to axios
window.axios = require('axios');

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

//Firebase initialize before app load
let app
firebase.default.auth().onAuthStateChanged(user => {
    if (!app) {
        app = createApp(App).use(store).use(router).mount('#app')
    }

    if (user) {
        store.dispatch('fetchUserProfile', user)
    }
})

