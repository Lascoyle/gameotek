import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    games: [],
    currentPage: 1,
    changePage: 1,
    queryGame: "",
    game: {},

    platforms: []
  },

  mutations: {
    getGames() {
      axios
      .get(`https://api.rawg.io/api/games?&page_size=40`)
      .then(response => {this.state.games = response.data})
      .catch(error => console.log(error));
    },

    callNextPage() {
      this.state.currentPage = this.state.currentPage + this.state.changePage;
      axios
      .get(`https://api.rawg.io/api/games?page=${this.state.currentPage}&page_size=40`)
      .then(response => {this.state.games = response.data})
      .catch(error => console.log(error));
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },

    callPreviousPage() {
      if(this.state.currentPage > 1)
      {
          this.state.currentPage = this.state.currentPage - this.state.changePage;
          axios
          .get(`https://api.rawg.io/api/games?page=${this.state.currentPage}&page_size=40`)
          .then(response => {this.state.games = response.data})
          .catch(error => console.log(error));
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
    },

    fetchGames(state, queryGame) {
      state.queryGame = queryGame;
      axios
      .get(`https://api.rawg.io/api/games?search=${this.state.queryGame}&page_size=40`)
      .then(response => {this.state.games = response.data})
      .catch(error => console.log(error));
      console.log(queryGame);
    },

    getGame(state, id) {
      state.game = {};
      axios
      .get(`https://api.rawg.io/api/games/${id}`)
      .then(response => {this.state.game = response.data})
      .catch(error => console.log(error));
    },

    getPlatforms() {
      axios
      .get(`https://api.rawg.io/api/platforms`)
      .then(response => {this.state.platforms = response.data})
      .catch(error => console.log(error));
    }
  },

  actions: {
    getGames: context => {
      context.commit('getGames')
    },

    getGame(context, id) {
      context.commit('getGame', id)
    },

    getPlatforms: context => {
      context.commit('getPlatforms')
    },

    fetchGames: context => {
      context.commit('fetchGames')
    }
  },
  modules: {

  }
})
