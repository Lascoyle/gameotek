<template>
  <div id="profile" class="p-6 lg:p-8 lg:pt-20 h-full">
    <h1 class="profile-title text-4xl lg:pl-16 font-black mb-10 text-purple-900 lg:mt-10">Welcome {{ userProfile.username.charAt(0).toUpperCase() + userProfile.username.slice(1) }}!</h1>
    <p class="ml-20">Here you can manage your collections, create new ones and add games to it!</p>
    <ul v-if="games.length != 0" class="p-20">
        <h2 class="recent-games-list-title text-purple-900 mb-5">Last games you've added</h2>
        <li v-for="(game,index) in games" :key="index" class="flex w-full p-4 px-8 justify-between items-center bg-white border-l-8 hover:border-purple-600 hover:bg-gray-50">
          <div class="w-full flex justify-between items-center">
            <div class="w-2/12">
              <router-link :to="{ name: 'Game', params: {id: game.api_id } }"><img :src="game.image" alt="" class="block h-36 "></router-link>
            </div>
            <details class="w-5/12">
              <summary class=" text-purple-900 game-listed-title cursor-pointer focus:outline-none">{{ game.title }}</summary>
              <div>
                <hr class="py-2 b-2">
                <div class="text-gray-600 text-xs text-justify leading-relaxed"><span v-html="game.description"></span></div>
              </div>
            </details>
            <div class="w-2/12 text-gray-700 font-medium cursor-default relative">
              <p @mouseover="showPlatformLabel" @mouseleave="unshowPlatformLabel" class="">{{ game.platform }}</p>
              <transition name="fade">
                <p v-if="platformLabelShown === true" class="text-white bg-gray-700 text-center rounded-lg w-6/12 absolute left-4 p-1">Platform</p>
              </transition>
            </div>
            <div class="w-1/12 text-gray-400 cursor-default relative">
              <p @mouseover="showReleaseLabel" @mouseleave="unshowReleaseLabel">{{ game.released_date }}</p>
              <transition name="fade">
                <p v-if="releaseLabelShown === true" class="text-white bg-gray-700 text-center rounded-lg w-8/12 absolute left-12 p-1">Release</p>
              </transition>
            </div>
            <button @click="deleteGame(game.id)"><img src="../../assets/icons/delete.png" alt="delete icon" class="w-6"></button>
          </div>
        </li>
    </ul>
    <div v-else>There's no games yet</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as fb from '../../main'

export default {
    name: "Profile",
    data() {
      return {
        games: [],
        platformLabelShown: false,
        releaseLabelShown: false
      }
    },
    computed: {
      ...mapState(['userProfile'])
    },

    created() {
      fb.gamesCollection.where("user_id", "==", fb.auth.currentUser.uid).orderBy('created_on', 'desc').limit(5).onSnapshot(snapshot => {
        if(this.games.length === 0){
            snapshot.docs.forEach(doc => {
            let game = doc.data();
            game.id = doc.id;
            this.games.push(game);
            console.log(this.games);
          })
        }
      })
    },

    methods: {
      deleteGame(id) {
        fb.gamesCollection.doc(id).delete();
        let gameToDelete = this.games.find( game => game.id === id);
        let index = this.games.indexOf(gameToDelete);
        this.games.splice(index, 1);
      },

      showPlatformLabel() {
        this.platformLabelShown = true;
      },

      unshowPlatformLabel() {
        this.platformLabelShown = false;
      },

      showReleaseLabel() {
        this.releaseLabelShown = true;
      },

      unshowReleaseLabel() {
        this.releaseLabelShown = false;
      }
    }
}
</script>

<style>
#profile {
  animation: fadeIn 500ms linear forwards;
  font-family: 'Prompt', sans-serif;
}

.profile-title {
  font-family: "Audiowide", cursive;
  font-size: 4rem;
}

.game-listed-title {
  font-family: "Audiowide", cursive;
}

.recent-games-list-title {
  font-family: "Audiowide", cursive;
  font-size: 3rem;
}

details[open] summary ~ * {
  animation: sweep 0.8s ease-in-out;
}

@keyframes sweep {
  0%    {opacity: 0; margin-top: -20px}
  100%  {opacity: 1; margin-top: 0px}
}
</style>