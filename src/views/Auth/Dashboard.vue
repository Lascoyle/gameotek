<template>
  <div id="profile" class="p-6 lg:p-8 lg:pt-20 h-full">
    <button class="bg-red-600 text-white rounded-md p-4" @click="deleteAccount">Delete Account</button>
    <h1 class="profile-title text-4xl lg:pl-16 font-black text-purple-900 lg:mt-10">Welcome {{ user.username }}!</h1>
    <ul v-if="lastGames.length != 0" class="w-11/12 m-auto py-16">
        <h2 @click="showLastGames" class="recent-games-list-title text-purple-900 mb-5 cursor-pointer"><span class="recent-games-list-title-arrow inline-block animate-bounce text-white bg-purple-900 p-2 rounded-full text-2xl">▼</span> Last games you've added</h2>
        <li v-for="(game,index) in lastGames" :key="index" class="relative flex w-full p-4 px-8 justify-between items-center bg-white border-l-8 border-purple-200  hover:border-purple-600 hover:bg-purple-50">
          <div v-if="lastGamesShown === false" class="game-hidden w-full absolute z-10 text-gray-400">{{ game.title }}</div>
          <transition name="slide-fade">
            <div v-show="lastGamesShown === true" class="w-full flex justify-between items-center">
              <div class="w-52 self-start">
                <router-link :to="{ name: 'Game', params: {id: game.api_id } }"><img :src="game.image" alt="" class="block w-52 rounded-lg"></router-link>
              </div>
              <details class="w-5/12">
                <summary class=" text-purple-900 game-listed-title cursor-pointer focus:outline-none">{{ game.title }}</summary>
                <div>
                  <hr class="py-2 b-2">
                  <div class="text-gray-600 text-xs text-justify leading-relaxed"><span v-html="game.description"></span></div>
                </div>
              </details>
              <div class="w-2/12 text-gray-700 font-medium cursor-default relative">
                <p @mouseover="showPlatformLabel(index)" @mouseleave="unshowPlatformLabel()" class="">{{ game.platform }}</p>
                <transition name="fade">
                  <p v-if="platformLabelShown === index" class="text-white bg-gray-800 text-center rounded-lg w-6/12 absolute left-4 p-1">Platform</p>
                </transition>
              </div>
              <div class="w-1/12 text-gray-400 cursor-default relative">
                <p @mouseover="showReleaseLabel(index)" @mouseleave="unshowReleaseLabel()">{{ game.released_date }}</p>
                <transition name="fade">
                  <p v-if="releaseLabelShown === index" class="text-white bg-gray-800 text-center rounded-lg w-8/12 absolute left-12 p-1">Release</p>
                </transition>
              </div>
              <button @click="deleteGame(game.id, index, game)"><img src="../../assets/icons/delete.png" alt="delete icon" class="w-6"></button>
            </div>
          </transition>
        </li>
    </ul>
    <ul class="bg-purple-900 text-white fixed top-16 z-50 right-0 platforms-listing">
      <h3 class="platforms-listing-title text-center py-6 text-2xl bg-purple-600">Collections</h3>
      <img src="../../assets/icons/package.png" alt="package icon for games collection" class="w-32 m-auto mb-6 my-8 block bg-purple-600 p-4 rounded-full">
      <div @click="returnAllGames" class="collected-games-counter text-center bg-white  text-xl w-8/12 m-auto p-3 rounded-md mb-8 cursor-pointer">
        <div class="text-purple-900 text-3xl">{{ allGames.length }}</div>
        <div class="text-gray-400">Games</div>
      </div>
      <li v-for="(platform, index) in sortedPlatforms" :key="index" class="border-b-2 text-center border-purple-800 px-6 py-3 hover:bg-purple-600 cursor-pointer" @click="filterGamesByPlatform(platform.name)">{{ platform.name }}</li>
    </ul>
    <ul v-if="filterOff" class="w-11/12 m-auto bg-white p-12">
      <div @click="sortByTitle(allGames)" class="bg-purple-500 float-right text-white text-xs text-center font-semibold p-1 py-2 m-4 rounded-full w-28 cursor-pointer hover:bg-white border-white border-2 hover:border-purple-500 hover:text-purple-500 transition delay-150 duration-300 ease-in-out">Sort By Title</div>
      <div @click="sortByPlatform(allGames)" class="bg-purple-500 float-right text-white text-xs text-center font-semibold p-1 py-2 m-4 rounded-full w-32 cursor-pointer hover:bg-white border-white border-2 hover:border-purple-500 hover:text-purple-500 transition delay-150 duration-300 ease-in-out">Sort By Platform</div>
      <div class="float-right text-gray-300 text-md text-center py-1 px-4 m-4 rounded-full  border-2 border-gray-300 flex justify-between items-center">
        <img src="../../assets/icons/game-gray.png" alt="gray disk icon" class="w-4 h-4 block mr-1">
        <div>{{ allGames.length }} Games</div>
      </div>
      <h2 class="text-3xl mb-8 text-purple-900"><img src="../../assets/icons/list.png" alt="" class="w-12 p-3 inline-block bg-purple-900"> List of all your games</h2>
      <li v-for="(game, index) in allGames" :key="index" class="hover:bg-purple-50 border-l-8 border-purple-200  hover:border-purple-900 cursor-pointer">
        <transition name="slide-fade">
          <div v-if="gameDeleted === index" @click="closeDeleteMessage" class="text-red-600 text-center bg-gray-50 py-4 flex justify-center items-center hover:bg-red-200 font-medium">
            <img src="../../assets/icons/delete-red.png" alt="red dete icon" class="w-4 h-4 mr-2">
            <div>{{ deleteMessage }}</div>
          </div>
        </transition>
        <div class="flex w-full justify-between items-center">
          <router-link :to="{ name: 'Game', params: {id: game.api_id } }" class="flex w-full justify-between items-center">
            <img :src="game.image" alt="" class="w-24">
            <div class="game-listed-title w-6/12 text-gray-800">{{ game.title }}</div>
            <div class="w-3/12 text-gray-600">{{ game.platform }}</div>
          </router-link>
          <button @click="deleteGame(game.id, index, game)"><img src="../../assets/icons/delete.png" alt="delete icon" class="w-4 mr-6"></button>
        </div>
        <hr>
      </li>
    </ul>
    <ul v-else class="w-11/12 m-auto bg-white p-12">
      <div @click="sortByTitle(filteredGames)" class="bg-purple-500 float-right text-white text-xs text-center font-semibold p-1 py-2 m-4 rounded-full w-28 cursor-pointer hover:bg-white border-white border-2 hover:border-purple-500 hover:text-purple-500 transition delay-150 duration-300 ease-in-out">Sort By Title</div>
      <div @click="returnAllGames" class="bg-purple-500 float-right text-white text-xs text-center font-semibold p-1 py-2 m-4 rounded-full w-28 cursor-pointer hover:bg-white border-white border-2 hover:border-purple-500 hover:text-purple-500 transition delay-150 duration-300 ease-in-out">All Games</div>
      <div class="float-right text-gray-300 text-md text-center py-1 px-4 m-4 rounded-full border-2 border-gray-300 flex justify-between items-center">
        <img src="../../assets/icons/game-gray.png" alt="gray disk icon" class="w-4 h-4 block mr-1">
        <div>{{ filteredGames.length }} Games</div>
      </div>
      <h2 class="text-3xl mb-8 text-purple-900"><img src="../../assets/icons/list.png" alt="" class="w-12 p-3 inline-block bg-purple-900"> Your games on {{ currentPlatform }} </h2>
      <li v-for="(game, index) in filteredGames" :key="index" class="hover:bg-purple-50 border-l-8 border-purple-200 hover:border-purple-900 cursor-pointer">
        <transition name="slide-fade">
          <div v-if="gameDeleted === index" @click="closeDeleteMessage" class="text-red-600 text-center bg-gray-50 py-4 flex justify-center items-center hover:bg-red-200 font-medium">
            <img src="../../assets/icons/delete-red.png" alt="red dete icon" class="w-4 h-4 mr-2">
            <div>{{ deleteMessage }}</div>
          </div>
        </transition>
        <div class="flex w-full justify-between items-center">
          <router-link :to="{ name: 'Game', params: {id: game.api_id } }" class="flex w-full justify-between items-center">
            <img :src="game.image" alt="" class="w-24">
            <div class="game-listed-title w-6/12 text-gray-800">{{ game.title }}</div>
            <div class="w-3/12 text-gray-600">{{ game.platform }}</div>
          </router-link>
          <button @click="deleteGame(game.id, index, game)"><img src="../../assets/icons/delete.png" alt="delete icon" class="w-4 mr-6"></button>
        </div>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as fb from '../../firestore-conf'
import { auth } from '../../firestore-conf'

export default {
    name: "Profile",
    data() {
      return {
        lastGames: new Array,
        allGames: new Array,
        platformLabelShown: null,
        releaseLabelShown: null,
        lastGamesShown: false,
        platforms: new Array,
        filterOff: true,
        filteredGames: new Array,
        currentPlatform: "",
        deleteMessage: "",
        gameDeleted: null
      }
    },

    computed: {
      ...mapState(
        {
          user: state => state.userProfile
        }
      ),
      sortedPlatforms: function() {
        return this.platforms.sort((a,b) => a.name < b.name ? -1 : 1)
      }
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
          })
        }
      });
      fb.gamesCollection.where("user_id", "==", fb.auth.currentUser.uid).get().then(snap => {
        snap.docs.forEach(doc => {
            let game = doc.data();
            game.id = doc.id;
            this.allGames.push(game);
          })
      });
    },

    methods: {
      deleteGame(id, index, game) {
        fb.gamesCollection.doc(id).delete();

        let lastGameToDelete = this.lastGames.find( game => game.id === id);
        let indexLastGames = this.lastGames.indexOf(lastGameToDelete);
        this.lastGames.splice(indexLastGames, 1);

        let allGameToDelete = this.allGames.find( game => game.id === id);
        let indexAllGames = this.allGames.indexOf(allGameToDelete);
        this.allGames.splice(indexAllGames, 1);

        let filteredGameToDelete = this.filteredGames.find( game => game.id === id);
        let indexFilteredGames = this.filteredGames.indexOf(filteredGameToDelete);
        this.filteredGames.splice(indexFilteredGames, 1);

        this.gameDeleted = index;

        this.deleteMessage = game.title + " have been removed from " + game.platform + " collection!"
      },

      closeDeleteMessage() {
        this.gameDeleted = null;
      },

      showPlatformLabel(index) {
        this.platformLabelShown = index;
      },

      unshowPlatformLabel() {
        this.platformLabelShown = false;
      },

      showReleaseLabel(index) {
        this.releaseLabelShown = index;
      },

      unshowReleaseLabel() {
        this.releaseLabelShown = false;
      },

      showLastGames() {
        this.lastGamesShown = !this.lastGamesShown;
        let arrow = document.querySelector('.recent-games-list-title-arrow');
        arrow.classList.toggle('arrow-rotation');
      },

      filterGamesByPlatform(platform) {
        this.filterOff = false;
        this.filteredGames = [];
        this.filteredGames = this.allGames.filter((item) => {
          if(item.platform == platform) {
            return item
          }
        });
        this.currentPlatform = platform;
      },

      returnAllGames() {
        this.filterOff = true;
      },

      sortByTitle(games) {
        games.sort((a,b) => a.title < b.title ? -1 : 1);
        console.log("sorted")
      },

      sortByPlatform(games) {
        games.sort((a,b) => a.platform < b.platform ? -1 : 1);
        console.log("sorted")
      },

      deleteAccount() {
        auth.currentUser.delete().then(function() {
          console.log("User has been deleted!!!");
        });
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

.platforms-listing {
  transform: translateX(95%);
  transition: transform 0.3s linear;
  overflow-y: scroll;
  scrollbar-width: thin;
  height: 91.5vh;
  width: 15vw;
}

.platforms-listing:hover {
  transform: translateX(0%);
}

.platforms-listing-title {
  font-family: "Audiowide", cursive;
}

.collected-games-counter {
  font-family: "Audiowide", cursive;
}

.game-listed-title {
  font-family: "Audiowide", cursive;
}
</style>