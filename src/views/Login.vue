<template>
  <div id="content" class="content">
    <div class="login">
      <form method="post" v-on:submit.prevent="onSubmit">
        <div class="input_row">
          <label for="">아이디</label>
          <input type="text" id="id" v-model="user.id" placeholder="test@test.com">
        </div>
        <div class="input_row">
          <label for="">비밀번호</label>
          <input type="password" id="password" v-model="user.password" placeholder="123123">
        </div>
        <button type="submit" :disabled="invalidForm">로그인</button>
      </form>
      <p class="error" v-if="error">{{error}}</p>
    </div>
  </div>
</template>

<script>
// import {auth, setAuthInHeader} from '../api';
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      user: {
        id: '',
        password: ''
      },
      error: '',
      rPath: ''
    }
  },
  computed: {
    invalidForm() {
      return !this.user.id || !this.user.password; // 하나라도 값이 없으면 true, 둘 다 채워지면 false를 반환
    }
  },
  created() {
    this.rPath = this.$route.query.rPath || '/';
    console.log('this.rPath : '+this.rPath);
  },
  methods: {
    ...mapActions([
      'LOGIN'
    ]),
    onSubmit() {
      this.LOGIN({email: this.user.id, password: this.user.password})
        .then(data => {
          // this.$session.set('user_id',data.user.id);
          console.log(data);
          this.$router.push(this.rPath);
        })
        .catch(error => {
          console.log('error : '+ error);
        })
    }
  }
}
</script>