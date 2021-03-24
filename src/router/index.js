import { createRouter, createWebHistory } from 'vue-router'
import * as firebase from 'firebase/app'
require("firebase/auth")

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

  {
    path: '/dashboard',
    name : 'Dashboard',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Auth/Dashboard.vue'),
    meta: {requiresAuth: true}
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAutheticated = firebase.default.auth().currentUser;
  if(requiresAuth && ! isAutheticated) {
    next("/login");
  } else {
    next();
  }
})

export default router