import Vue from 'vue'
import App from './App.vue'
import {router} from './routes/index.js'
import axios from 'axios';
import VueSession from 'vue-session';
import store from './store';

// layouts
import Default from './layouts/Default.vue';
import Blank from './layouts/Blank.vue';

// plugins
import ChartPlugin from './plugins/ChartPlugin.js';

// bootstrap 
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('default-layout', Default);
Vue.component('blank-layout', Blank);

const sessionOptions = {
  persist: true
}
Vue.use(VueSession, sessionOptions);
Vue.use(ChartPlugin); // install() 이라는 메서드가 실행될꺼임
// Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') // root경로일 때 app으로
