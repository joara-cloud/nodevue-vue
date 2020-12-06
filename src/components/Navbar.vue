<template>
  <div id="header">
    <nav class="nav">
      <div class="inner">
        <h1><router-link to="/">AppName</router-link></h1>
        <ul class="gnb">
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/chart">Chart</router-link></li>
          <!-- <li><router-link to="/userlist">Userlist</router-link></li> -->
          <li><router-link to="/b/1">Board</router-link></li>
          <li v-if="!isAuth"><router-link to="/signup" class="btn">Signup</router-link></li>
          <li>
            <a href="" v-if="isAuth" @click.prevent="logout" class="btn">Logout</a>
            <router-link to="/login" v-else class="btn">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template> 

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      test: ''
    }
  },
  computed: {
    ...mapState([
      'bodyColor',
      'navbarColor'
      ]),
    ...mapGetters([
      'isAuth'
    ]),
  },
  watch: { // Board.vue에서 fetchData() 후 SET_THEME로 컬러를 넘겨주었지만 state값만 변경되고 실제 DOM에 색상을 적용하는 것은 해당 Navbar.vue의 updateTheme()에서 하고있음 그렇기 때문에 state.navColor나 state.bodyColor 가 변경 됐을 때 updateTheme()이 호출되면 되겠다 그래서 watch로 감시를 걸어줌!
    'bodyColor': 'updateTheme' // state의 bodyColor를 감시하고 있다가 값이 변경되면 updateTheme 메서드를 실행!
  },
  mounted() {
    this.updateTheme()
  },
  methods: {
    ...mapMutations([
      'LOGOUT'
    ]),
    logout() {
      this.LOGOUT()
      this.$router.push('/login');
    },
    updateTheme() {
      this.$el.style.backgroundColor = this.navbarColor // this.$el 는 navbar element를 가져옴

      const body = document.querySelector('body')
      const container = document.querySelector('.container')
      if (container) container.style.backgroundColor = this.bodyColor
      if (body) body.style.backgroundColor = this.bodyColor
    }
  }
}
</script>

<style>
.inner {max-width:1140px;width:100%;margin:0 auto}
.nav {overflow:hidden;padding:14px 0;}
.nav a {color:#fff}
.nav a.btn {color:#222}
.nav h1 {float:left;}
.nav .inner {display:flex;justify-content:space-between;align-items:center}
.nav .gnb {float:right;}
.nav .gnb > li {display:inline-block;margin-left:20px}
/* .nav .gnb > li > a {color:#555} */
</style>