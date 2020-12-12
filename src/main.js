import Vue from 'vue'
import App from './App.vue'

const Login = {
  template: '<div>Login Page</div>'
}
const routes = {
  '/': App,
  '/login': Login
}

new Vue({
  el: '#app',
  computed: {
    VueComponent() {
      return routes[window.location.pathname] || // path(예, /login) 
        { template: '<div>Page not found</div>' }
    }
  },
  render(h) {
    return h(this.VueComponent)
  }
})