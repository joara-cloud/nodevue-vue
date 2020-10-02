import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieIndexPage from '../components/MovieIndexPage.vue'
import MovieShowPage from '../components/MovieShowPage.vue';
import SignUp from '../views/SignUp.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/movies',
    name: 'MovieIndexPage',
    component: MovieIndexPage
  },
  {
    path: '/movies:id',
    name: 'MovieShowPage',
    component: MovieShowPage 
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp 
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
