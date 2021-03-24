import { createStore } from 'vuex'
import * as fb from '../main'
import router from '../router/index'

export default createStore({
  state: {
    games: [],
    currentPage: 1,
    changePage: 1,
    queryGame: "",
    game: {},

    platforms: [],

    userProfile: {}
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
    },

    setUserProfile(state, val) {
      state.userProfile = val
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
    },


    //LOGIN ACTIONS
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      // router.push({name: 'Dashboard'})

      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },


    // REGISTER ACTIONS
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        username: form.username,
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    }
  },
  modules: {

  }
})
