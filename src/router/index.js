import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Historia from '../views/Historia.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/historia',
    name: 'Historia',
    component: Historia
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:nome',
    name: 'Buscas',
    error: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Buscas.vue'),
  },


]

const router = new VueRouter({
  routes
})

export default router
