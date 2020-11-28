import Vue from 'vue';
import VueRouter from 'vue-router';
import Card from '../components/Card.vue';
import store from '../store';

Vue.use(VueRouter);

// console.log('index.js : '+sessionStorage.getItem('user_id'));
// console.dir(sessionStorage);

// 로그인 유무 체크해서 페이지 경로 이동
const requireAuth = (to, from, next) => {
  // const isAuth = Vue.$session.get('user_no');
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}` // 로그인이 완료되면 현재페이지로 redirect // to : 현재 경로가 들어있음
  store.getters.isAuth ? next() : next(loginPath); // 로컬스토리지에 토큰이 있는지 없는지 체크 후 토큰값이 있으면 next()를 호출, 그렇지 않으면 loginPath로 리다이렉트
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('../views/Chart.vue')
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
    children: [ // 중첩 라우팅
      {
        path: 'c/:cid',
        component: Card // 이 Card컴포넌트는 Board컴포넌트 내에 출력이 됨 (즉, Board.vue 내 router-view 영역에 출력이 됨)
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
