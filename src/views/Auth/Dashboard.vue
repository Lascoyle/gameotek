<template>
  <div id="profile" class="p-6 lg:p-8 lg:pt-20 h-full">
    <h1 class="profile-title text-4xl lg:pl-16 font-black text-purple-900 lg:mt-10">Welcome {{ user.username }}!</h1>
    <ul v-if="lastGames.length != 0" class="px-20 py-16">
        <h2 @click="showLastGames" class="recent-games-list-title text-purple-900 mb-5 cursor-pointer"><span class="recent-games-list-title-arrow inline-block animate-bounce">▼</span> Last games you've added</h2>
        <li v-for="(game,index) in lastGames" :key="index" class="relative flex w-full p-4 px-8 justify-between items-center bg-white border-l-8 hover:border-purple-600 hover:bg-gray-50">
          <div v-if="lastGamesShown === false" class="game-hidden w-full absolute z-10 text-gray-400">{{ game.title }}</div>
          <transition name="slide-fade">
            <div v-show="lastGamesShown === true" class="w-full flex justify-between items-center">
              <div class="w-52 self-start">
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
          </transition>
        </li>
    </ul>
    <ul class="bg-purple-900 text-white w-2/12 fixed top-16 z-50 right-0 platforms-list">
      <h4 class="absolute text-xl px-1 py-1 text-purple-600">❰❰</h4>
      <li v-for="(platform, index) in platforms" :key="index" class="ml-7 border-b-2 border-purple-800 px-6 py-3 hover:bg-purple-600 cursor-pointer" @click="filterGamesByPlatform(platform.name)">{{ platform.name }}</li>
    </ul>
    <ul v-if="filterOff">
      <li v-for="(game, index) in allGames" :key="index" class="flex w-8/12 justify-between">
        <div>{{ game.title }}</div>
        <div>{{ game.platform }}</div>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(game, index) in filteredGames" :key="index" class="flex w-8/12 justify-between">
        <div>{{ game.title }}</div>
        <div>{{ game.platform }}</div>
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
        lastGames: new Array,
        allGames: new Array,
        gamesCounter: new Number,
        platformLabelShown: false,
        releaseLabelShown: false,
        lastGamesShown: false,
        platforms: new Array,
        filterOff: true,
        filteredGames: new Array
      }
    },

    computed: {
      ...mapState(
        {
          user: state => state.userProfile
        }
      ),
    },

    mounted() {
      axios
        .get(`https://api.rawg.io/api/platforms`)
        .then(response => {this.platforms = response.data.results})
        .catch(error => console.log(error));
    },

    created() {
      fb.gamesCollection.where("user_id", "==", fb.auth.currentUser.uid).orderBy('created_on', 'desc').limit(5).onSnapshot(snapshot => {
        if(this.lastGames.length === 0){
            snapshot.docs.forEach(doc => {
            let game = doc.data();
            game.id = doc.id;
            this.lastGames.push(game);
            console.log(this.lastGames)
          })
        }
      });
      fb.gamesCollection.where("user_id", "==", fb.auth.currentUser.uid).get().then(snap => {
        this.gamesCounter = snap.size;
        snap.docs.forEach(doc => {
            let game = doc.data();
            game.id = doc.id;
            this.allGames.push(game);
            console.log(this.allGames)
          })
      });
    },

    methods: {
      deleteGame(id) {
        fb.gamesCollection.doc(id).delete();
        let gameToDelete = this.lastGames.find( game => game.id === id);
        let index = this.lastGames.indexOf(gameToDelete);
        this.lastGames.splice(index, 1);
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
      },

      showLastGames() {
        this.lastGamesShown = !this.lastGamesShown;
        let arrow = document.querySelector('.recent-games-list-title-arrow');
        arrow.classList.add('arrow-rotation');
      },

      filterGamesByPlatform(platform) {
        console.log(platform);
        this.filterOff = false;
        this.filteredGames = [];
        this.filteredGames = this.allGames.filter((item) => {
          if(item.platform == platform) {
            return item
          }
        })
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
  font-size: 2.5rem;
}

.recent-games-list-title-arrow {
  font-size: 2rem;
}

.arrow-rotation {
  animation: arrowRotation 0.3s linear forwards;
}

@keyframes arrowRotation {
  to {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

details[open] summary ~ * {
  animation: sweep 0.8s ease-in-out;
}

@keyframes sweep {
  0%    {opacity: 0; margin-top: -20px}
  100%  {opacity: 1; margin-top: 0px}
}

.game-hidden {
  opacity: 0;
  display: hidden;
  transform: translateX(-2%);
  animation: gameFade 0.5s 0.8s linear forwards;
}

@keyframes gameFade {
  from {
    opacity: 0;
    display: hidden;
  }
  to {
    opacity: 1;
    display: block;
    transform: translateX(0%);
  }
}

.platforms-list {
  transform: translateX(90%);
  transition: transform 0.3s linear;
  overflow-y: scroll;
  scrollbar-width: thin;
  height: 100vh;
}

.platforms-list:hover {
  transform: translateX(0%);
}
</style>