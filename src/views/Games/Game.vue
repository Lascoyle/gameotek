<template>
  <section id="currentgame">
        <div class="currentgame-header min-w-full bg-gray-300">
            <img :src="game.background_image" alt="image from the game" class="currentgame-image">
            <h1 class="currentgame-title text-white bottom-0 right-4 absolute">{{ game.name }}</h1>
        </div>
        <div class="currentgame-overview w-full md:flex justify-between">
            <article class="currentgame-description-container w-10/12 p-20">
            <router-link :to="{ name: 'GameAdd', params: {id: game.id}}" class="add-game-link text-4xl font-extrabold float-right text-purple-600 bg-gray-100 border-4 border-purple-300 rounded-full pb-4 pt-4 px-7 hover:text-white hover:bg-purple-900 hover:border-purple-600 transition duration-500 ease-in-out" v-if="loggedIn">+</router-link>
                <h2 class="currentgame-description-title leading-snug mb-10 text-purple-900 ">{{ game.name }}</h2>
                <div class="flex justify-end items-center mb-8">
                    <img src="../../assets/icons/calendar.png" alt="calendar icon" class="w-6 h-6 block mr-2">
                    <div class="text-xl text-purple-900 font-medium ">Released on {{ formatDate(game.released) }}</div>
                </div>
                <div v-html="game.description" class="currentgame-description p-16 leading-loose text-gray-600 text-lg bg-white mb-20 rounded-lg"></div>
                <h3 class="currentgame-gallery text-purple-900 leading-tight">Screenshots of {{ game.name }}</h3>
                <div class="flex flex-wrap py-1 ">
                    <div v-for="(screenshot, index) in screenshots" :key="index" class="w-4/12 p-1 currentgame-screenshot-container relative">
                        <a :href="screenshot.image" target="_blank"><img :src="screenshot.image" alt="game's screenshot" class="block rounded-lg relative currentgame-screenshot"></a>
                        <img src="../../assets/icons/zoom.svg" class="zoom-screenshot w-9 absolute bottom-3 right-4 text-white opacity-40 font-bold">
                    </div>
                </div>

                <h3 class="currentgame-gallery text-purple-900 leading-tight">Game Series</h3>
                <div class="flex flex-wrap py-10">
                    <div v-for="(gameSerie, index) in gameSeries" :key="index" class="w-72 h-44 overflow-hidden currentgame-suggestions-container relative rounded-lg m-1">
                        <router-link :to="{ name: 'Game', params: { id: gameSerie.id}}" replace @click="refreshGame">
                            <img :src="gameSerie.background_image" alt="game's suggestions" class="block currentgame-suggestions h-44 w-72 overflow-hidden" @mouseover="showGameSerieTitle(index)" @mouseleave="hideGameSerieTitle">
                            <div v-show="gameSerieTitleShown === index" class="suggestion-name absolute w-52 text-center text-lg text-white font-bold opacity-80">{{ gameSerie.name }}</div>
                        </router-link>
                    </div>
                </div>

                <h3 class="currentgame-creators-title text-purple-900 leading-tight">Creators</h3>
                <div class="currentgame-creators-container py-10 w-full">
                        <ul class="currentgame-creators w-full">
                            <li :style="{ backgroundImage: 'url(' + creator.image_background + ')'}" class="currentgame-creator w-3/4 bg-center bg-cover bg-no-repeat rounded-lg py-9 px-8 flex mb-4 relative" v-for="(creator, index) in creators" :key="index">
                                <img v-if="creator.image != null" :src="creator.image" alt="" class="rounded-full w-28 h-28 block creator-img self-center">
                                <img v-else src="../../assets/icons/unknown.svg" alt="" class="rounded-full w-28 h-28 block creator-img self-center">
                                <div class="ml-8 flex w-9/12 flex-col justify-between">
                                    <div class="flex items-center w-full justify-between">
                                        <p class="creator-name text-white text-2xl pb-2">{{ creator.name }}</p>
                                        <div class="flex">
                                            <img src="../../assets/icons/game.png" alt="" class="creator-games-icon w-5 h-5">
                                            <p class="creator-games-count ml-1 text-white">{{ creator.games_count }}</p>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="flex flex-col justify-between h-full">
                                        <div class="w-full flex">
                                            <span class="text-center text-md font-semibold text-white mr-3" v-for="(position, index) in creator.positions" :key="index">{{ position.name.charAt(0).toUpperCase() + position.name.slice(1) }}</span>
                                        </div>
                                    </div>
                                    <ul class="w-full flex flex-wrap h-2/4">
                                        <div class="text-xs mr-4 text-gray-400 font-medium leading-normal underline" v-for="(game, index) in creator.games" :key="index">
                                            <router-link :to="{ name: 'Game', params: { id: game.id}}" replace @click="refreshGame" class="border-none hover:text-white">
                                                {{ game.name }}
                                            </router-link>
                                        </div>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
            </article>
            <aside class="currentgame-infos-container w-3/12 text-white">
                <div class="currentgame-infos">
                    <div class="currentgame-rating-container p-8 py-20">
                        <h5 class="currentgame-rating-title text-4xl text-right">Ratings</h5>
                        <div class="currentgame-rating text-center flex items-center justify-center">
                            <div>{{ game.rating }}</div>
                            <div class="max-rating">/5</div>
                        </div>
                        <div class="currentgame-ratingbar w-full text-gray-400" >
                            <div v-for="(rating, index) in game.ratings" :key="index" class="w-full mb-4 my-3 bg-gray-100 p-3 px-4 rounded-lg">
                                <span v-if="rating.title === 'exceptional'" class="text-3xl">😀</span>
                                <span v-else-if="rating.title === 'recommended'" class="text-3xl">🙂</span>
                                <span v-else-if="rating.title === 'skip'" class="text-3xl">☹️</span>
                                <span v-else class="text-3xl">😑</span>
                                <span class="rating-label ml-2">{{ rating.title.charAt(0).toUpperCase() + rating.title.slice(1)}} </span>
                                <div class="flex flex-row-reverse items-center mt-3">
                                    <div :style="{ width: rating.percent + '%', animation: 'changeWidth 1.25s linear' }" class="h-6 rounded-md ml-3" :class="`${rating.title}`"></div>
                                    <div class="ratings-counts">{{ rating.count }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                     <div :style="{ backgroundImage: 'url(' + game.background_image_additional + ')' }" class="background-layer bg-center bg-no-repeat bg-cover relative py-20">
                        <h4 class="currentgame-infos-title text-4xl pb-6 px-8 text-right">Informations</h4>
                         <div class="currentgame-platforms-container px-8 py-4 w-full">
                            <h5 class="currentgame-platforms-title text-right">Platforms</h5>
                             <ul class="currentgame-platforms flex flex-row-reverse flex-wrap w-full text-center">
                                 <li class="currentgame-platform  my-3 bg-gray-300 rounded-full p-2 px-4 text-xs bg-opacity-30 font-bold self-center ml-2" v-for="(platform, index) in game.platforms" :key="index">
                                     {{ platform.platform.name }}
                                </li>
                             </ul>
                         </div>
                         <hr class="w-10/12 m-auto">
                         <div class="currentgame-genres-container px-8 py-4 w-full">
                            <h5 class="currentgame-genres-title text-right">Genres</h5>
                             <ul class="currentgame-genres flex flex-row-reverse flex-wrap w-full text-center">
                                 <li class="currentgame-platform  my-3 bg-gray-300 rounded-full p-2 px-4 text-xs bg-opacity-30 font-bold self-center ml-2" v-for="(genre, index) in game.genres" :key="index">
                                     {{ genre.name }}
                                </li>
                             </ul>
                         </div>
                         <hr class="w-10/12 m-auto">
                         <div class="currentgame-developers-container px-8 py-4 w-full">
                            <h5 class="currentgame-developers-title text-right">Developers</h5>
                             <ul class="currentgame-developers flex flex-row-reverse flex-wrap w-full text-center">
                                 <li class="currentgame-platform  my-3 bg-gray-300 rounded-full p-2 px-4 text-xs bg-opacity-30 font-bold self-center ml-2" v-for="(developer, index) in game.developers" :key="index">
                                     {{ developer.name }}
                                </li>
                             </ul>
                         </div>
                         <hr class="w-10/12 m-auto">
                         <div class="currentgame-publishers-container px-8 py-4  w-full">
                            <h5 class="currentgame-publishers-title text-right">Publishers</h5>
                             <ul class="currentgame-publishers flex flex-row-reverse flex-wrap w-full text-center">
                                 <li class="currentgame-platform  my-3 bg-gray-300 rounded-full p-2 px-4 text-xs bg-opacity-30 font-bold self-center ml-2" v-for="(publisher, index) in game.publishers" :key="index">
                                     {{ publisher.name }}
                                </li>
                             </ul>
                         </div>
                         <hr class="w-10/12 m-auto">
                         <div class="currentgame-tags-container px-8 py-4 w-full">
                            <h5 class="currentgame-tags-title text-right">Tags</h5>
                             <ul class="currentgame-tags flex flex-wrap flex-row-reverse">
                                 <li class="currentgame-tag text-sm leading-loose ml-3 underline" v-for="(tag, index) in game.tags" :key="index"> {{ tag.name.charAt(0).toUpperCase() + tag.name.slice(1) }}</li>
                             </ul>
                         </div>
                         <div class="currentgame-website-container px-8 py-4 w-full">
                            <h6 class="currentgame-website-title text-right">Website</h6>
                            <p class="currentgame-website text-right w-full hover:underline" v-if="game.website != ''"><a :href="game.website">{{ game.website }}</a></p>
                            <p class="text-right w-full" v-else>No official website known.</p>
                         </div>
                    </div>
                </div>
            </aside>
        </div>

  </section>
</template>

<script>
import { mapState } from 'vuex'
import * as firebase from 'firebase/app'
import moment from 'moment'
export default {
    name: "Game",
    data() {
        return {
            screenshots: [],
            gameSerieTitleShown: false,
            creators: [],
            gameSeries: [],
            loggedIn: false
        }
    },

    computed: {
        ...mapState({
            game: state => state.game,
        }),
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

    mounted() {
        this.$store.dispatch('getGame', this.$route.params.id);

        axios
        .get(`http://localhost:3000/game-screenshots/${this.$route.params.id}`)
        .then(response => {this.screenshots = response.data.results})
        .catch(error => console.log(error));

        axios
        .get(`http://localhost:3000/game-dev-team/${this.$route.params.id}`)
        .then(response => {this.creators = response.data.results})
        .catch(error => console.log(error));

        axios
        .get(`http://localhost:3000/game-series/${this.$route.params.id}`)
        .then(response => {this.gameSeries = response.data.results})
        .catch(error => console.log(error));
    },

    methods: {
        showGameSerieTitle(index) {
            this.gameSerieTitleShown = index
        },

        hideGameSerieTitle() {
            this.gameSerieTitleShown = false
        },

        refreshGame () {
            this.$store.commit('getGame')
        },

        formatDate(value) {
            value = moment(value).format('MMMM dddd Do YYYY');
            return value;
        }
    }
}
</script>

<style>
#currentgame {
    animation: fadeIn 500ms linear forwards;
    font-family: 'Prompt', sans-serif;
}

@keyframes fadeIn{
  from {
    opacity: 0;
     }
 to {
    opacity: 1
  }
}

.currentgame-header {
    height: 70vh;
    overflow: hidden;
    position: relative;
}

.currentgame-image {
    filter:  brightness(40%);
    width: 100vw;
}

.currentgame-title {

    position: absolute;
    font-family: 'Audiowide', cursive;
    font-size: 6.5rem;
    mix-blend-mode: soft-light;
    animation: slideLeftFadeIn 1.2s ease-out;
}

@keyframes slideLeftFadeIn {
    0% {
        opacity: 0;
        transform: translateX(-30%);
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: translateX(0%);
    }
}

.add-game-link {
    font-family: "Audiowide", cursive;
}

.currentgame-description-title {
    font-family: 'Audiowide', cursive;
    font-size: 4rem;
}

.currentgame-description {
    height: 400px;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #A78BFA #DDD6FE;
    text-align: justify;
}


.currentgame-description > p {
    margin-bottom: 40px;
}

.currentgame-description > p:first-of-type:first-letter {
  float:left;
  font-size: 5em;
  padding: 0.05em 0.05em 0 0;
  color: #34D399;
}

.currentgame-infos-container {
    background-color: #27104b;
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232d1651' fill-opacity='0.93' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
}

.currentgame-gallery {
    font-family: 'Audiowide', cursive;
    font-size: 3rem;
}

.currentgame-screenshot-container {
    transition: 0.5s ease-out;
}

.currentgame-screenshot-container:hover {
    transform: scale(1.15);
    filter:contrast(1.15);
    z-index: 3000;
    filter: drop-shadow(7px 7px 10px #050505);
}

.suggestion-name {
    font-family: "Audiowide", cursive;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.currentgame-suggestions {
    transition: 0.5s ease-out;
}

.currentgame-suggestions:hover {
    filter: contrast(120%) brightness(70%) blur(0.5px);
}

.currentgame-creators-title {
    font-family: "Audiowide", cursive;
    font-size: 3rem;
}

.currentgame-creator {
    background-color: #18072285;
    background-blend-mode: darken;
    transition: 300ms linear;
}

.currentgame-creator:hover {
    cursor: pointer;
    filter: drop-shadow(5px 5px 4px #05050577);
    background-blend-mode: soft-light;
    transform: scale(105%);
}

.creator-name {
    font-family: "Audiowide", cursive;
}

.creator-games-count {
    font-family: "Audiowide", cursive;
}

.background-layer {
    background-color: #170725a4;
    background-blend-mode: darken;
}

.currentgame-infos-title {
    font-family: "Audiowide", cursive;
}

.currentgame-rating {
    font-size: 3rem;
}

.max-rating {
    font-size: 5rem;
}

.currentgame-rating-title {
    font-family: "Audiowide", cursive;
}

.exceptional {
    background: #34d399;
}

.recommended {
    background: #4338CA;
}

.meh {
    background: #FBBF24;
}

.skip {
    background: #DC2626;
}

.currentgame-rating {
    font-family: "Audiowide", cursive;
}

.rating-label {
    font-family: "Audiowide", cursive;
    font-size: 1.3rem;
}

.ratings-counts {
    font-family: "Audiowide", cursive;
    font-size: 1.2rem;
}

@keyframes changeWidth {
    from {
        width: 0%;
    }
}

.currentgame-platforms-title, .currentgame-genres-title, .currentgame-developers-title, .currentgame-publishers-title, .currentgame-tags-title, .currentgame-website-title {
    font-family: "Audiowide", cursive;
}
</style>