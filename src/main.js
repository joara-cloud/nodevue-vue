import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

const Login = {
  template: '<div>Login Page</div>'
}
const NotFound = {
  template: '<div>Page not found</div>'
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: App }, // 우선순위는 위에서부터 찾음
    { path: '/login', component: Login },
    { path: '*', component: NotFound }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

// 해쉬(#) : 브라우저에서 라우팅할 때 해쉬백 모드라는 것이 동작하고 있음 브라우저에 히스토리 API가 없을 경우에는 해쉬백모드를 사용하는데 크롬은 히스토리 API가 있기때문에 해시백 모드를 사용하지않고 히스토리 모드를 사용함 mode: 'history'