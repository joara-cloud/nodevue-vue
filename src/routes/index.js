import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Card from '../views/Card.vue';

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  // 로컬스토리지에 토큰이 있는지 없는지 체크
  const isAuth = localStorage.getItem('token');
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}` // 로그인이 완료되면 현재페이지로 redirect, to : 현재 경로가 들어있음

  isAuth ? next() : next(loginPath); // 로그인이 돼서 토큰값이 있으면 next()를 호출, 그렇지 않으면 loginPath로 리다이렉트
}

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
    beforeEnter: requireAuth,
    component: () => import('../views/Board.vue'),
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
    meta: {
      layout: 'blank'
    },
    component: () => import('../views/404.vue')
  }
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
