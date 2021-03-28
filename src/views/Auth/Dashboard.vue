<template>
  <div id="profile" class="p-6 lg:p-8 lg:pt-20 h-full">
    <h1 class="profile-title text-4xl lg:pl-16 font-black mb-10 text-purple-900 lg:mt-10">Welcome {{ userProfile.username.charAt(0).toUpperCase() + userProfile.username.slice(1) }}!</h1>
    <h2 class="ml-20">Here you can manage your collections, create new ones and add games to it!</h2>
    <ul v-if="games.length != 0" class="p-20">
        <li v-for="(game, index) in games" :key="index" class="flex w-full p-4 px-8 justify-between items-center bg-white border-">
          <div class="w-full flex justify-between items-center">
            <div class="w-2/12">
              <router-link :to="{ name: 'Game', params: {id: game.api_id } }"><img :src="game.image" alt="" class="block h-24 "></router-link>
            </div>
            <details class="w-5/12">
              <summary class=" text-purple-900 game-listed-title cursor-pointer">{{ game.title }}</summary>
              <div class="text-black text-xs text-justify">
                <hr class="py-2">
                <div>{{ game.description }}</div>
              </div>
            </details>
            <div class="w-2/12"><p>{{ game.platform }}</p></div>
            <div class="w-1/12"><p>{{ game.released_date }}</p></div>
            <button @click="deleteGame(game.title)"><img src="../../assets/icons/delete.png" alt="delete icon" class="w-6"></button>
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
        games: []
      }
    },
    computed: {
      ...mapState(['userProfile'])
    },
    created() {
      fb.gamesCollection.where("user_id", "==", fb.auth.currentUser.uid).onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          let game = doc.data();
          this.games.push(game);
          console.log(this.games)
        })
      })
    },
    methods: {
      deleteGame() {
        fb.gamesCollection.doc().delete();
        console.log('game deleted');
      }
    }
}
</script>

<style>
#profile {
  animation: fadeIn 500ms linear forwards;
}

.profile-title {
  font-family: "Audiowide", cursive;
  font-size: 4rem;
}

.game-listed-title {
  font-family: "Audiowide", cursive;
}
</style>