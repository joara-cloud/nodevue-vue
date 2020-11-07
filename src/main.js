import Vue from 'vue'
import App from './App.vue'
import {router} from './routes/index.js'
import axios from 'axios';
import VueSession from 'vue-session';
import store from './store';

import Default from './layouts/Default.vue';
import Blank from './layouts/Blank.vue';

Vue.component('default-layout', Default);
Vue.component('blank-layout', Blank);


const sessionOptions = {
  persist: true
}
Vue.use(VueSession, sessionOptions);

Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
