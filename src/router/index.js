import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },

  {
    path: '/games',
    name: 'Games',
    component: () => import(/* webpackChunkName: "games" */ '../views/Games.vue')
  },

  {
    path: '/game/:id',
    name: 'Game',
    component: () => import(/* webpackChunkName: "game" */ '../views/Game.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
