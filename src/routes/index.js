import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Card from '../components/Card.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'blank'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/userlist',
    name: 'UserList',
    component: () => import('../views/UserList.vue') 
  },
  {
    path: '/b/:bid',
    name: 'Board',
    component: () => import('../components/Board.vue'),
    children: [
      {
        path: 'c/:cid',
        component: Card
      }
    ]
  },
  {
    path: '*',
    name: 'notfound',
    component: () => import('../views/404.vue')
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
