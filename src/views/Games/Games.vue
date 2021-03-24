<template>
    <section id="all-games" class="p-6 lg:p-8 lg:pt-20 text-white h-full">
        <h1 class="games-title text-4xl lg:pl-16 font-black mb-10 text-purple-900 lg:mt-10">All Games</h1>
        <div  class="previous-games hover:text-purple-600 text-gray-300" @click="callPreviousPage()">❰</div>
        <div class="next-games hover:text-purple-600 text-gray-300" @click="callNextPage()">❱</div>
        <div class="order-elmts flex justify-end items-center w-full mr-20 my-10">
            <div class="search ml-4 mr-12">
                <input class="text-gray-600 rounded-full rounded-r-none border-r-0 border-4 focus:outline-none focus:bg-gray-900 focus:text-white transition duration-75 ease-linear p-2" type="text" placeholder="Search a game..." :value="queryGame" @keyup.enter="fetchGames">
                <img src="../../assets/icons/search.svg" alt="" class="h-12 inline-block bg-white absolute border-4 border-l-0 rounded-full rounded-l-none p-2">
            </div>
            <div @click="sortByName()" class="order-elmt rounded-full transition duration-150 cursor-pointer hover:bg-gray-400 ease-linear bg-gray-900 font-bold p-3 px-4 ml-4">
                Order by name
            </div>
            <div class=" order-elmt rounded-full transition duration-150 ease-linear cursor-pointer hover:bg-gray-400 bg-gray-900 font-bold mr-20 ml-4 p-3 px-4" @click="fetchPlatforms()">
                <p>Platforms</p>
            </div>
        </div>
        <transition name="slide-fade">
            <div v-show="fetchedPlatforms" class="platforms-list-container w-11/12 m-auto p-12 px-16 rounded-lg content-between">
                <div class="platforms-closer hover:opacity-100 text-white" @click="hidePlatforms()">X</div>
                <h3 class="text-2xl mb-8">Platforms List</h3>
                <ul class="platforms-list flex flex-wrap w-full">
                        <li v-for="(platform, index) in platforms.results" :key="index" class="platforms-list-elmt w-2/12 border-green-400 hover:text-green-400 text-xs leading-relaxed p-1">{{ platform.name }}</li>
                </ul>
            </div>
        </transition>
        <ul class="games-list h-full flex flex-column justify-center lg:flex-row flex-wrap lg:px-16">
            <li class="game card w-12/12 sm:w-6/12 lg:w-4/12 xl:w-3/12 p-4" v-for="(game, index) in games.results" :key="index">
                <router-link :to="{ name: 'Game', params: { id: game.id } }">
                    <div class="game-image-container rounded-t-lg">
                        <img v-if="game.background_image != null" :src="game.background_image" alt="" class="game-image block">
                        <img v-else src="../../assets/images/no-image.png" alt="" class="game-image block">
                    </div>
                </router-link>
                <div class="game-textual card-header bg-gray-200 rounded-b-lg">
                    <header class="card-header flex items-baseline justify-between bg-gray-300 p-4">
                        <router-link :to="{ name: 'Game', params: {id: game.id} }"><h2 class="game-name text-2xl font-black w-10/12 mb-5">{{ game.name }}</h2></router-link>
                        <p class="game-rating"><span class="text-purple-500 font-bold text-xl">{{ Math.round(game.rating) }}</span><span class="text-green-400 font-black text-3xl">/{{ game.rating_top }}</span></p>
                    </header>
                   <div class="p-4">
                        <ul class="genres-list flex flex-wrap justify-end font-semibold">
                                <li class="genre text-sm text-green-400 p-1" v-for="(genre, index) in game.genres" :key="index">
                                    {{ genre.name }}
                                </li>
                        </ul>
                        <ul class="platforms-list flex flex-wrap justify-end mt-5">
                            <li class="platform text-xs bg-gray-400 p-1 px-3 rounded-full text-center m-1" v-for="(platform, index) in game.platforms" :key="index">
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
// import axios from 'axios';
import { mapState, mapMutations, mapActions } from "vuex"

export default {
    name: "Games",
    data() {
        return {
            platforms: [],
            queryGame: "",
            fetchedPlatforms: false,
        }
    },

    computed: {
        ...mapState(
            {
                games: state => state.games,
                queryGame: state => state.queryGame
            }
        )
    },

    mounted() {
        this.$store.dispatch('getGames');
        axios
            .get(`https://api.rawg.io/api/platforms`)
            .then(response => {this.platforms = response.data})
            .catch(error => console.log(error));
    },

    methods: {

        ...mapMutations([
            "callNextPage", "callPreviousPage"
        ]),

        ...mapActions([
            "fetchGames"
        ]),

        fetchGames (event) {
            this.$store.commit('fetchGames', event.target.value)
        },

        // fetchGames() {
        //     axios
        //     .get(`https://api.rawg.io/api/games?search=${this.queryGame}&page_size=40`)
        //     .then(response => {this.games = response.data});
        // },

        sortByName() {
            this.games.results.sort((a,b) => a.name < b.name ? -1 : 1);
        },

        sendGameId(gameId) {
            $emitter.emit('sendGameId', gameId);
        },

        fetchPlatforms() {
            this.fetchedPlatforms = true;
        },

        hidePlatforms() {
            this.fetchedPlatforms = false;
        },
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
    }

    .next-games {
        right: 2%;
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