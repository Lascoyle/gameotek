<template>
  <nav id="nav" class="bg-purple-400 h-16 w-full flex flex-column justify-center fixed z-50 bg-opacity-20">
    <div class="nav-links-group w-full flex justify-between items-center px-20">
        <div>
          <router-link to="/" class="nav-link text-white text-xl focus:outline-none mx-3" exact>Home</router-link>
          <router-link to="/games" class="nav-link text-white text-xl focus:outline-none mx-3" exact>Games</router-link>
          <router-link to="/platforms" class="nav-link text-white text-xl focus:outline-none mx-3" exact>Platforms</router-link>
        </div>
          <img src="../assets/icons/gameotek2.png" alt="application logo" class="w-18 mt-8">
        <div>
          <router-link to="/login" class="nav-link text-white text-xl focus:outline-none mx-3" exact v-if="loggedIn">Login</router-link>
          <router-link to="/register" class="nav-link text-white text-xl focus:outline-none mx-3" exact v-if="loggedIn">Register</router-link>
          <router-link :to="{ name: 'Dashboard', params: {id: userProfile.username}}" class="nav-link text-white text-xl focus:outline-none mx-3" exact v-if="!loggedIn">{{ userProfile.username }}</router-link>
          <button @click="signOut" class="logout text-purple-800 text-lg bg-white px-4 py-1 rounded-full" v-if="!loggedIn">Sign Out</button>
        </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '../firestore-conf'
export default {
    name: 'Navigation',
    data() {
      return {
        loggedIn: false
      }
    },

    computed: {
      ...mapState(['userProfile'])
    },

    created() {
        auth.onAuthStateChanged(user => {
            if(user) {
                this.loggedIn = false;
            } else {
                this.loggedIn = true;
            }
        })
    },

    methods: {
        async signOut() {
            try {
                const data = auth.signOut();
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
.nav-link {
  font-family: 'Audiowide', cursive;
  }

.router-link-active {
  border-bottom: #4c1d95 4px solid
}

.logout {
  font-family: 'Audiowide', cursive;
}
</style>