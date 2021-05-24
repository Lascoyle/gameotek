<template>
    <section id="all-games" class="p-6 lg:p-8 lg:pt-20 text-white h-full">
        <h1 class="games-title text-4xl lg:pl-16 font-black mb-10 text-purple-900 lg:mt-10">All Games</h1>
        <div  class="previous-games hover:text-purple-600 text-purple-400" @click="callPreviousPage()">❰</div>
        <div class="next-games hover:text-purple-600 text-purple-400" @click="callNextPage()">❱</div>
        <div class="order-elmts flex justify-end items-center w-full mr-20 my-10">
            <div class="search ml-4 mr-12">
                <input class="text-gray-600 rounded-full rounded-r-none border-r-0 border-4 border-purple-300 focus:outline-none focus:bg-gray-900 focus:text-white transition duration-75 ease-linear p-2" type="text" placeholder="Search a game..." :value="queryGame" @keyup.enter="fetchGames">
                <img src="../../assets/icons/search.svg" alt="" class="h-12 inline-block bg-white absolute border-4 border-purple-300 border-l-0 rounded-full rounded-l-none p-2">
            </div>
            <div @click="sortGamesByName()" class="order-elmt rounded-full transition duration-150 cursor-pointer hover:bg-gray-400 ease-linear bg-gray-900 font-bold p-3 px-4 ml-4 flex">
                <img src="../../assets/icons/alphabetical.png" alt="" class="w-6 h-6 block mr-2">
                Order by Name
            </div>
            <div class="order-elmt rounded-full transition duration-150 ease-linear cursor-pointer hover:bg-gray-400 bg-gray-900 font-bold mr-20 ml-4 p-3 px-4 flex" @click="fetchPlatforms()">
                <img src="../../assets/icons/console.png" alt="" class="w-6 h-6 block mr-2">
                <p>Platforms</p>
            </div>
        </div>
        <transition name="slide-fade">
            <div v-show="fetchedPlatforms" class="platforms-list-container w-11/12 m-auto p-12 px-16 rounded-lg content-between">
                <div class="platforms-closer hover:opacity-100 text-white" @click="hidePlatforms()">X</div>
                <h3 class="text-2xl mb-8">Platforms List</h3>
                <hr>
                <ul class="platforms-list flex flex-col h-80 flex-wrap w-full mt-4">
                    <li v-for="(platform, index) in sortedPlatforms" :key="index" class="platforms-list-elmt w-2/12 border-green-400 hover:text-green-400 text-xs leading-relaxed p-1 my-1">{{ platform.name }}</li>
                </ul>
            </div>
        </transition>
        <ul class="games-list h-full flex flex-column justify-center lg:flex-row flex-wrap lg:px-16">
            <li class="game-card w-12/12 sm:w-6/12 lg:w-4/12 xl:w-3/12 p-4" v-for="(game, index) in games" :key="index">
                <router-link :to="{ name: 'Game', params: { id: game.id } }">
                    <div class="game-image-container rounded-t-lg bg-gray-300">
                        <img v-if="game.background_image != null" :src="game.background_image" alt="" class="game-image block">
                        <img v-else src="../../assets/images/no-image.png" alt="" class="game-image block">
                    </div>
                </router-link>
                <div class="game-textual card-header  rounded-b-lg">
                    <header class="card-header p-4">
                        <div class="flex justify-between">
                            <router-link :to="{ name: 'Game', params: {id: game.id} }"><h2 class="game-name text-gray-500 text-2xl font-black w-10/12 mb-5">{{ game.name }}</h2></router-link>
                            <p class="game-rating"><span class="text-purple-500 font-bold text-4xl">{{ Math.round(game.rating) }}</span><span class="text-gray-300 font-bold text-xl">/{{ game.rating_top }}</span></p>
                        </div>
                        <div class="w-full flex justify-between items-center">
                            <div class="text-purple-500 font-semibold text-sm">
                                 <div>{{ formatDate(game.released) }}</div>
                            </div>
                            <router-link :to="{ name: 'GameAdd', params: {id: game.id}}">
                                <div class="font-bold text-xl border-2 pt-1 border-purple-600 text-purple-500 text-center rounded-full w-10 h-10 float cursor-pointer hover:bg-purple-500 hover:border-purple-500 hover:text-white transition duration-500 ease-in-out">✚</div>
                            </router-link>
                        </div>
                    </header>
                    <hr class="w-10/12 m-auto">
                   <div class="p-4 card-body ">
                        <ul class="genres-list flex flex-wrap justify-end font-semibold">
                                <li class="genre text-sm text-purple-500 p-1" v-for="(genre, index) in game.genres" :key="index">
                                    {{ genre.name }}
                                </li>
                        </ul>
                        <ul class="platforms-list flex flex-wrap justify-end mt-5">
                            <li class="platform text-xs bg-gray-300 p-1 px-3 rounded-full text-center m-1" v-for="(platform, index) in game.platforms" :key="index">
                                    {{ platform.platform.name }}
                            </li>
                        </ul>
                   </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
import moment from 'moment'
import * as firebase from 'firebase/app'

export default {
    name: "Games",
    data() {
        return {
            queryGame: "",
            fetchedPlatforms: false,
            loggedIn: false,
        }
    },

    computed: {
        ...mapState(
            {
                games: state => state.games,
                platforms: state => state.platforms,
                queryGame: state => state.queryGame
            }
        ),
        sortedPlatforms: function() {
        return this.platforms.sort((a,b) => a.name < b.name ? -1 : 1)
      }
    },

    mounted() {
        this.$store.dispatch('getGames');
         this.$store.dispatch("getPlatforms");
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

        ...mapMutations([
            "callNextPage", "callPreviousPage", "sortGamesByName"
        ]),

        ...mapActions([
            "fetchGames"
        ]),

        fetchGames (event) {
            this.$store.commit('fetchGames', event.target.value)
        },

        fetchPlatforms() {
            this.fetchedPlatforms = true;
        },

        hidePlatforms() {
            this.fetchedPlatforms = false;
        },

        formatDate(value) {
            value = moment(value).format('MMMM Do YYYY');
            return value;
        }
    }
}
</script>

<style>
    #all-games {
        font-family: 'Prompt', sans-serif;
        animation: fadeIn 200ms linear forwards;
    }

    h1, h2, h3, h4, h5, h5 {
        font-family: 'Audiowide', cursive;
    }

    .order-elmt {
        width: unset;
    }

    .platforms-list-container {
        background-color: #27104b;
        background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232d1651' fill-opacity='0.93' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
    }

    .platforms-list {
        font-family: 'Audiowide', cursive;
    }

    .platforms-list-elmt:hover {
        cursor: pointer;
        border-left: solid 4px;
    }

    .games-title {
        font-size: 5rem;
    }


    .previous-games, .next-games {
        cursor: pointer;
        position: fixed;
        font-size: 3rem;
        top: 50%;
        transition: text-shadow 0.1s linear;
    }

    .previous-games:hover, .next-games:hover {
        text-shadow: 4px 4px rgba(95, 95, 95, 0.452);
    }

    .next-games {
        right: 2%;
    }

    .card-header {
        background-color: #fefcff;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(284,768,375)'%3E%3Cstop offset='0' stop-color='%23fefcff'/%3E%3Cstop offset='1' stop-color='%23ffffff'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.02'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
        background-attachment: fixed;
        background-size: cover;
    }

    .game-image-container {
        max-width: 100%;
        overflow: hidden;
    }

    .game-rating {
        font-family: 'Audiowide', cursive;
    }

    .game-image {
        width: 100%;
        height: 180px;
        transform: scale(150%);
        overflow: hidden;
        transition: 250ms linear;
        animation: fadeIn 500ms linear forwards;
    }

    .game-image:hover {
        transform: scale(1.15);
    }

    .platform {
        width: unset;
    }

    .platforms-closer {
        position: absolute;
        right: 9%;
        font-weight: 600;
        opacity: 0.25;
    }

    .platforms-closer:hover {
        cursor: pointer;
        text-shadow: 2px 2px rgba(51, 51, 51, 0.315);
        padding-right: 1px;
    }

    @media screen and (min-width: 640px) {

    }
    @media screen and (min-width: 768px) {
        .previous-games, .next-games {
            font-size: 4rem;
        }
    }
    @media screen and (min-width: 1024px) {
        .previous-games, .next-games {
            font-size: 5rem;
        }
    }
    @media screen and (min-width: 1280px) {
        .previous-games, .next-games {
            font-size: 6rem;
        }
    }
    @media screen and (min-width: 1536px) {

    }
</style>