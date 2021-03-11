<template>
  <section id="currentgame">
        <div class="currentgame-header">
            <img :src="game.background_image" alt="image from the game" class="currentgame-image">
            <h1 class="currentgame-title text-white bottom-0 right-4 absolute">{{ game.name }}</h1>
        </div>
        <div class="currentgame-overview w-full flex justify-between">
            <div class="currentgame-description-container w-8/12 p-20">
                <h2 class="currentgame-description-title leading-snug mb-10 text-purple-900 ">{{ game.name }} 's story</h2>
                <div v-html="game.description" class="currentgame-description p-16 leading-loose text-gray-600 text-lg bg-white bg-opacity-50 mb-20"></div>
                <h3 class="currentgame-gallery text-purple-900 leading-tight">Screenshots of {{ game.name }}</h3>
                <div class="flex flex-wrap my-12">
                    <div v-for="(screenshot, index) in screenshots" :key="index" class="w-4/12 p-1">
                        <a :href="screenshot.image" target="_blank"><img :src="screenshot.image" alt="game's screenshot" class="block rounded-lg"></a>
                    </div>
                </div>
            </div>
            <div class="currentgame-infos-container w-3/12">
                <!-- <iframe :src="game.clip.clip" ></iframe> -->
                <div class="currentgame-genres">
                    <div v-for="(genre, index) in game.genres" :key="index">{{ genre.name }}</div>
                </div>
            </div>
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
            screenshots: []
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
        console.log(this.screenshots)

    },
}
</script>

<style>
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
    box-shadow: 20px 20px  (rgba(255, 0, 0, 0.699));
    position: absolute;
    font-family: 'Audiowide', cursive;
    font-size: 6.5rem;
    mix-blend-mode: soft-light;
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
    text-indent: 50px;
}

.currentgame-description > p {
    margin-bottom: 40px;
}

.currentgame-infos-container {
    background-color: #27104b;
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232d1651' fill-opacity='0.93' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
}

.currentgame-gallery {
    font-family: 'Audiowide', cursive;
    font-size: 3rem;
}
</style>