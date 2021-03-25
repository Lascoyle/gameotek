<template>
    <div id="game-add" class="p-6 lg:p-8 lg:pt-20 h-full">
        <h1 class="game-add-title text-purple-900 w-8/12 games-title text-4xl lg:pl-16 font-black mb-10 lg:mt-10">Add Game to Collection</h1>
        <form @submit.prevent="addGame" class="w-8/12 mx-16 p-10 bg-white rounded-lg">
            <div class="game-add-id py-3">
                <label for="game-add-id" name="game-add-id" class="block">Game Id:</label>
                <input type="text" disabled="disabled" :value="game.id" class="block rounded-full bg-gray-100 text-gray-500 px-4 py-2">
            </div>
            <div class="game-add-name py-3">
                <label for="game-add-name" name="game-add-name" class="block">Game Title:</label>
                <input type="text" disabled="disabled" :value="game.name" class="block rounded-full bg-gray-100 text-gray-500 px-4 py-2">
            </div>
            <div class="game-add-released py-3">
                <label for="game-add-released" name="game-add-released" class="block">Game Released:</label>
                <input type="text" disabled="disabled" :value="game.released" class="block rounded-full bg-gray-100 text-gray-500 px-4 py-2">
            </div>
            <div class="game-add-image py-3">
                <label for="game-add-image" name="game-add-image" class="block">Game Image:</label>
                <input type="text" disabled="disabled" :value="game.background_image" class="block rounded-full bg-gray-100 text-gray-500 px-4 py-2">
            </div>
            <div class="game-add-description py-3">
                <label for="game-add-description" name="game-add-description" class="block">Game Description:</label>
                <textarea type="textarea" name="game-add-description" cols="70" rows="4" disabled="disabled" :value="game.description_raw" class="rounded-lg bg-gray-100 text-gray-500 px-4 py-2"></textarea>
            </div>
            <div class="game-add-platform py-3">
                <label for="game-add-platform" name="game-add-platform" class="block">Game Platform:</label>
                <select name="game-add-platform">
                    <option v-for="(addPlatform, index) in addPlatforms.results" :key="index" :value="addPlatform.name">{{ addPlatform.name }}</option>
                </select>
            </div>
            <button type="submit" class="bg-gray-900 rounded-full text-white px-4 py-2">Add game to the collection</button>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "GameAdd",
    data() {
        return {
            addPlatforms:[]
        }
    },

    computed: {
        ...mapState({
            game: state => state.game,
        }),
    },

    mounted() {
        this.$store.dispatch('getGame', this.$route.params.id);
        axios
            .get(`https://api.rawg.io/api/platforms`)
            .then(response => {this.addPlatforms = response.data})
            .catch(error => console.log(error));
    },

    methods: {
        addGame() {

        }
    }
}
</script>

<style>
    #game-add {
        font-family: "Prompt", sans-serif;
        animation: fadeIn 200ms linear forwards;
    }

    .game-add-title {
        font-family: "Audiowide", cursive;
        font-size: 4em;
    }
    
</style>