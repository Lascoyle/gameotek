<template>
    <div class="bg-purple-600 fixed right-0 z-10 top-20 p-12 rounded-lg rounded-r-none text-white w-3/12">
        <div v-if="loggedIn" class=" text-center">Your are logged in!</div>
        <div v-else class=" text-center">Your are not logged in...</div>
        <div class="m-auto w-5/12">
            <button @click="signOut" class="bg-white text-purple-900 px-4 py-1 mt-2 font-semibold rounded-full">Sign Out</button>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app'
require("firebase/auth")
export default {
    name: "TopHeader",

    data() {
        return {
            loggedIn: false
        }
    },

    created() {
        firebase.default.auth().onAuthStateChanged(user => {
            if(user) {
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
        })
    },

    methods: {
        async signOut() {
            try {
                const data = firebase.default.auth().signOut();
                console.log(data);
                this.$router.replace({name: "Login"});
            } catch(error) {
                console.log(err);
            }
        }
    }
}
</script>

<style>

</style>