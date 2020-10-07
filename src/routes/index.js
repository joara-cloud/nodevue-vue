import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../views/SignUp.vue';
import Login from '../views/Login.vue';
import UserList from '../views/UserList.vue';
import Home from '../views/Home.vue';
import MovieIndexPage from '../components/MovieIndexPage.vue'
import MovieShowPage from '../components/MovieShowPage.vue';
import Board from '../components/Board.vue';
import Card from '../components/Card.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login 
  },
  {
    path: '/userlist',
    name: 'UserList',
    component: UserList 
  },
  {
    path: '/b/:bid',
    name: 'Board',
    component: Board,
    children: [
      {
        path: 'c/:cid',
        component: Card
      }
    ]
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
