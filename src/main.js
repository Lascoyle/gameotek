import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Global access to axios
window.axios = require('axios');

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

