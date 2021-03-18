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
    component: () => import(/* webpackChunkName: "games" */ '../views/Games/Games.vue')
  },

  {
    path: '/game/:id',
    name: 'Game',
    component: () => import(/* webpackChunkName: "game" */ '../views/Games/Game.vue')
  },

  {
    path: '/platforms',
    name : 'Platforms',
    component: () => import(/* webpackChunkName: "platforms" */ '../views/Platforms/Platforms.vue')
  },

  {
    path: '/login',
    name : 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Login.vue')
  },

  {
    path: '/register',
    name : 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Auth/Register.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
     }
  },
})

export default router
