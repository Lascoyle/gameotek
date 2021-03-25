<template>
  <div id="profile" class="p-6 lg:p-8 lg:pt-20 h-full">
    <h1 class="profile-title text-4xl lg:pl-16 font-black mb-10 text-purple-900 lg:mt-10">Welcome {{ userProfile.username.charAt(0).toUpperCase() + userProfile.username.slice(1) }}!</h1>
    <h2 class="ml-20">Here you can manage your collections, create new ones and add games to it!</h2>
    <ul class="p-20">
        <li v-for="(game, index) in games" :key="index" class="flex w-full p-4 justify-between items-center bg-white border-">
          <router-link :to="{ name: 'Game', params: {id: game.id } }"><img :src="game.image" alt="" class="block h-24 "></router-link>
          <h3>{{ game.title }}</h3>
          <p>{{ game.platform }}</p>
          <p>{{ game.released_date }}</p>
          <p>{{ game.platform }}</p>
          <hr>
        </li>
    </ul>
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
      fb.gamesCollection.onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          let game = doc.data();
          this.games.push(game)
        })
      })
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
</style>