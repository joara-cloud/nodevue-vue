<template>
  <div>
    <form method="post" v-on:submit.prevent="login">
      <div class="input_row">
        <label for="">아이디</label>
        <input type="text" id="id" v-model="user.id">
      </div>
      <div class="input_row">
        <label for="">비밀번호</label>
        <input type="password" id="password" v-model="user.password">
      </div>
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$http.post('/users/login', {user: this.user})
        .then(response => {
          console.log(response);
          if(response.data.success) {
            alert(response.data.msg);
            this.$router.push('/');
          }else {
            alert(response.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          return;
        })
    }
  }
}
</script>