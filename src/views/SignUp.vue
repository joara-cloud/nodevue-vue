<template>
  <div id="content">
    <div class="sign_up">
      <form method="post" v-on:submit.prevent="signUp">
        <div class="input_row">
          <label for="id">아이디</label>
          <input type="text" id="id" v-model="user.userid">
        </div>
        <div class="input_row">
          <label for="name">이름</label>
          <input type="text" id="name" v-model="user.name">
        </div>
        <div class="input_row">
          <label for="password">비밀번호</label>
          <input type="password" name="pasword" id="pasword" v-model="user.password">
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {
        userid: '',
        name: '',
        password: ''
      }
    }
  },
  methods: {
    // signUp 메소드에서는 axios로 /api/users/signUp을 호출하여, 입력받은 데이터(this.user)를 user 객체에 저장합니다. 
    signUp: function() {
      console.log('signUp method 실행됨');
      this.$http.post('/users/signup', {user: this.user})
        .then((res) => { // 정상 처리 되면, 성공 메시지를 노출하고 login 페이지로 이동을 시키며,
          console.log('axios 성공');
          if(res.data.success == true) {
            alert(res.data.msg);
            // this.$router.push('/login')
          } else {
            alert(res.data.msg);
          }
        })
        .catch(function(error) { // 실패하면 에러 메시지를 띄웁니다.
          console.log('axios실행 중 에러');
          alert(error.stack);
        })
    }
  }

}
</script>