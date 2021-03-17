<template>
  <section id="currentgame">
        <div class="currentgame-header">
            <img :src="game.background_image" alt="image from the game" class="currentgame-image">
            <h1 class="currentgame-title text-white bottom-0 right-4 absolute">{{ game.name }}</h1>
        </div>
        <div class="currentgame-overview w-full md:flex justify-between">
            <article class="currentgame-description-container w-8/12 p-20">
                <h2 class="currentgame-description-title leading-snug mb-10 text-purple-900 ">{{ game.name }}</h2>
                <div v-html="game.description" class="currentgame-description p-16 leading-loose text-gray-600 text-lg bg-white bg-opacity-50 mb-20"></div>
                <h3 class="currentgame-gallery text-purple-900 leading-tight">Screenshots of {{ game.name }}</h3>
                <div class="flex flex-wrap my-12">
                    <div v-for="(screenshot, index) in screenshots" :key="index" class="w-4/12 p-1 currentgame-screenshot-container relative">
                        <a :href="screenshot.image" target="_blank"><img :src="screenshot.image" alt="game's screenshot" class="block rounded-lg relative currentgame-screenshot"></a>
                        <img src="../assets/icons/zoom.png" class="zoom-screenshot w-6 absolute bottom-5 right-6 text-white opacity-40 font-bold">
                    </div>
                </div>
                <h3 class="currentgame-gallery text-purple-900 leading-tight">Similar games</h3>
                <div class="flex flex-wrap my-12">
                    <div v-for="(suggestion, index) in suggestions" :key="index" class="w-64 p-1 currentgame-suggestions-container relative">
                        <a :href="suggestion.background_image" target="_blank"><img :src="suggestion.background_image" alt="game's suggestions" class="block rounded-lg relative currentgame-suggestions" @mouseenter="suggestionTitle = true" @mouseleave="suggestionTitle = false"></a>
                        <div v-show="suggestionTitle" class="suggestion-name absolute top-1/3 w-52 text-center text-lg text-white font-bold opacity-80">{{ suggestion.name }}</div>
                    </div>
                </div>
                <h3 class="currentgame-creators-title text-purple-900 leading-tight">Creators</h3>
                <div class="currentgame-creators-container py-20 w-full">
                        <ul class="currentgame-creators w-full">
                            <li :style="{ backgroundImage: 'url(' + creator.image_background + ')'}" class="currentgame-creator w-2/3 bg-center bg-cover bg-no-repeat rounded-lg py-9 px-8 flex mb-4 relative" v-for="(creator, index) in creators" :key="index">
                                <img v-if="creator.image != null" :src="creator.image" alt="" class="rounded-full w-28 h-28 block creator-img self-center">
                                <img v-else src="../assets/icons/unknown.svg" alt="" class="rounded-full w-28 h-28 block creator-img self-center">
                                <div class="ml-8 flex w-full flex-col justify-between">
                                    <div class="flex items-center w-full justify-between">
                                        <p class="creator-name text-white text-2xl pb-2">{{ creator.name }}</p>
                                        <div class="flex">
                                            <img src="../assets/icons/game.png" alt="" class="creator-games-icon w-5 h-5">
                                            <p class="creator-games-count ml-1 text-white">{{ creator.games_count }}</p>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="flex flex-col justify-between h-full">
                                        <div class="w-full flex">
                                            <span class="text-center text-md font-semibold text-white mr-3" v-for="(position, index) in creator.positions" :key="index">{{ position.name.charAt(0).toUpperCase() + position.name.slice(1) }}</span>
                                        </div>
                                    </div>
                                    <div class="w-full flex flex-wrap h-2/4">
                                        <div class="text-xs mr-4 text-white font-medium leading-normal underline" v-for="(game, index) in creator.games" :key="index">{{ game.name }}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
            </article>
            <aside class="currentgame-infos-container w-3/12 text-white">
                <!-- <iframe :src="game.clip.clip" width="100%" height="17%" allow="fullscreen" frameborder="0"></iframe> -->
                <div class="currentgame-infos">
                    <div class="currentgame-rating-container p-8 py-20">
                        <h5 class="currentgame-rating-title text-4xl text-right">Ratings</h5>
                        <div class="currentgame-rating text-center flex items-center justify-center">
                            <div>{{ game.rating }}</div>
                            <div class="max-rating">/5</div>
                        </div>
                        <div class="currentgame-ratingbar w-full" >
                            <div v-for="(rating, index) in game.ratings" :key="index" class="w-full mb-4 my-6">
                                <div class="rating-label">{{ rating.title.charAt(0).toUpperCase() + rating.title.slice(1)}} :</div>
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
                    </div>
                </div>
            </aside>
        </div>

  </section>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    name: "Game",
    data() {
        return {
            screenshots: [],
            suggestions: [],
            suggestionTitle: false,
            creators: []
        }
    },

    computed: {
        ...mapState({
            game: state => state.game,
        })
    },

    mounted() {
        this.$store.dispatch('getGame', this.$route.params.id);

        axios
        .get(`https://api.rawg.io/api/games/${this.$route.params.id}/screenshots`)
        .then(response => {this.screenshots = response.data.results})
        .catch(error => console.log(error));
        console.log(this.screenshots);

        axios
        .get(`https://api.rawg.io/api/games/${this.$route.params.id}/suggested`)
        .then(response => {this.suggestions = response.data.results})
        .catch(error => console.log(error));
        console.log(this.suggestions);

        axios
        .get(`https://api.rawg.io/api/games/${this.$route.params.id}/development-team`)
        .then(response => {this.creators = response.data.results})
        .catch(error => console.log(error));
        console.log(this.creators);

    },

    methods: {
        showSuggestionTitle() {
            this.suggestionTitle = true
        }
    }
}
</script>

<style>
#currentgame {
    animation: fadeIn 500ms linear forwards;
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

.currentgame-description-title {
    font-family: 'Audiowide', cursive;
    font-size: 4rem;
}

.currentgame-description {
    font-family: 'Prompt', sans-serif;
    height: 400px;
    overflow-y: scroll;
    scrollbar-width: thin;
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

.currentgame-screenshot {
    transition: 0.5s ease-out;
}

.currentgame-screenshot:hover {
    transform: scale(1.15);
    filter:contrast(1.15);
    z-index: 3000;
    filter: drop-shadow(7px 7px 10px #050505);
}

.suggestion-name {
    font-family: "Audiowide", cursive;
    left: 50%;
    transform: translateX(-50%);
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
    /* height: 130vh; */
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

.currentgame-platforms-title, .currentgame-genres-title, .currentgame-developers-title, .currentgame-publishers-title, .currentgame-tags-title {
    font-family: "Audiowide", cursive;
}
</style>