<template>
  <div id="content">
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
import {auth, setAuthInHeader} from '../api';
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
    onSubmit() {
      auth.login(this.user.id, this.user.password)
        .then(data => {
          localStorage.setItem('token', data.accessToken);
          this.$session.set('user_id',data.user.id);
          setAuthInHeader(data.accessToken);
          this.$router.push(this.rPath);
        })
        .catch(error => {
          console.log('error : '+ error);
        })
    }
  }
  // methods: {
  //   onSubmit() {
  //     this.$http.post('/users/login', {user: this.user})
  //       .then(response => {
  //         console.log(response);
  //         if(response.data.success) {
  //           alert(response.data.msg);
  //           this.$router.push('/');
  //         }else {
  //           alert(response.data.msg);
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         return;
  //       })
  //   }
  // }
}
</script>