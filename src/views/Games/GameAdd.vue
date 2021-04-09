<template>
    <div id="game-add" class="p-6 lg:p-8 lg:pt-20 h-full">
        <form @submit.prevent="addGame" class="w-11/12 mx-16 py-10 pl-16 bg-white rounded-lg relative">
            <div>
                <div :style="{ backgroundImage: 'url(' + game.background_image + ')'}" class="game-add-image w-3/12 right-0 top-0 rounded-r-lg h-96 absolute bg-top bg-no-repeat bg-cover"></div>
                <h1 class="game-add-title text-purple-900 w-12/12 games-title text-4xl  font-black mb-10 lg:mt-10">Add Game to Collection</h1>
                <h2 class="game-add-form-title text-purple-900 w-8/12">{{ userProfile.username.charAt(0).toUpperCase() + userProfile.username.slice(1) }}, you are about to add <span class="border-b-4 border-purple-900 font-black">{{ game.name }}</span>. Are you sure? </h2>
                <div class="game-add-id py-3 text-gray-700 font-semibold w-full">
                    <label for="game-add-id" name="game-add-id" class="block py-2">Game Id :</label>
                    <input type="text" disabled="disabled" :value="gameAddForm.id = game.id" class="block rounded-full bg-gray-100 text-gray-500 px-4 py-2 w-7/12">
                </div>
                <div class="game-add-name py-3 text-gray-700 font-semibold w-full">
                    <label for="game-add-name" name="game-add-name" class="block py-2">Game Title :</label>
                    <input type="text" disabled="disabled" :value="gameAddForm.title = game.name" class="block rounded-full bg-gray-100 text-gray-500 px-4 py-2 w-7/12">
                </div>
                <div class="game-add-released py-3 text-gray-700 font-semibold w-full">
                    <label for="game-add-released" name="game-add-released" class="block py-2">Game Released :</label>
                    <input type="text" disabled="disabled" :value="gameAddForm.released_date = formatDate(game.released)" class="block rounded-full bg-gray-100 text-gray-500 px-4 py-2 w-7/12">
                </div>
                <div class="game-add-image py-3 text-gray-700 font-semibold w-full">
                    <label for="game-add-image" name="game-add-image" class="block py-2">Game Image :</label>
                    <input type="text" disabled="disabled" :value="gameAddForm.image = game.background_image" class="block rounded-full bg-gray-100 text-gray-500 px-4 py-2 w-7/12">
                </div>
                <div class="game-add-description py-3 text-gray-700 font-semibold w-full">
                    <label for="game-add-description" name="game-add-description" class="block py-2">Game Description :</label>
                    <textarea type="textarea" name="game-add-description" cols="70" rows="4" disabled="disabled" :value="gameAddForm.description = game.description" class="game-add-description rounded-lg bg-gray-100 text-gray-500 px-4 py-2 w-7/12"></textarea>
                </div>
                <div class="game-add-platform py-3 text-gray-700 font-semibold w-full">
                    <label for="game-add-platform" name="game-add-platform" class="block py-2">Game Platform :</label>
                    <select name="game-add-platform" @change="changePlatform($event)" v-model="gameAddForm.platform" class="w-3/12">
                        <option value="">Select a platform...</option>
                        <option v-for="(addPlatform, index) in addPlatforms" :key="index" >{{ addPlatform.name }}</option>
                    </select>
                </div>
                <button type="submit" class="bg-gray-900 rounded-full text-white px-4 py-2 my-4">Add game to the collection</button>
                <transition name="slide-fade">
                    <div v-if="successStatus === true" class="text-green-400 font-semibold"><img src="../../assets/icons/victory-sign.png" alt="" class="inline-block w-8"> {{ successMessage}}</div>
                </transition>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
// import * as fb from '../../main'
import * as fb from '../../firestore-conf'

export default {
    name: "GameAdd",
    data() {
        return {
            addPlatforms:[],
            gameAddForm: {
                id: "",
                title: "",
                description: "",
                released_date: "",
                platform: "",
                image: ""
            },
            successStatus: false,
            successMessage: ""
        }
    },

    computed: {
        ...mapState(['game','userProfile'] ),
    },

    mounted() {
        this.$store.dispatch('getGame', this.$route.params.id);
        axios
            .get(`https://api.rawg.io/api/platforms`)
            .then(response => {this.addPlatforms = response.data.results})
            .catch(error => console.log(error));
    },

    methods: {
        formatDate(value) {
            value = moment(value).format('L');
            return value;
        },

        changePlatform(event) {
            this.gameAddForm.platform = event.target.value;
            return this.gameAddForm.platform;
        },

        async addGame() {
                const game = {
                    api_id: this.gameAddForm.id,
                    title: this.gameAddForm.title,
                    description: this.gameAddForm.description,
                    image: this.gameAddForm.image,
                    released_date: this.gameAddForm.released_date,
                    platform: this.gameAddForm.platform,
                    user_id: fb.auth.currentUser.uid,
                    created_on: new Date()
                };

                fb.gamesCollection.add(game)

                this.successStatus = true
                this.successMessage = game.title + " was successfully added to your " + game.platform + " Collection!"
        }
    }
}
</script>

<style>
    #game-add {
        font-family: "Prompt", sans-serif;
        animation: fadeIn 200ms linear forwards;
    }

    .game-add-image {
        height: 100%;
    }

    .game-add-title {
        font-family: "Audiowide", cursive;
        font-size: 4em;
    }

    .game-add-form-title {
        font-family: "Audiowide", cursive;
        font-size: 1.5em;
    }

    .game-add-description {
        scrollbar-width: thin;
    }
</style>