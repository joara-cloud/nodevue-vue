<template>
  <div id="main">
    Home
    <!-- <div>
      Board List : 
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="b in boards" :key="b.id">
          <p>{{b}}</p>
        </div>
      </div>
      <ul>
        <li><router-link to="/b/1">Board 1</router-link></li>
        <li><router-link to="/b/2">Board 2</router-link></li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import {board} from '../api';

export default {
  data() {
    return {
      loading: false, 
      boards: ''
    }
  },
  created() {
    // this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;

      board.fetch()
        .then(data => {
          this.boards = data;
        })
        .finally(() => {
          this.loading = false;
        });
      
      // this.$http.get('http://localhost:3000/boards')
      //   .then(res => {
      //     this.boards = res.data;
      //   })
      //   .catch(res => {
      //     this.$router.replace('/login');
      //     console.log(res);
      //   })
      //   .finally(() => { // then, catch 가 모두 수행된 후 실행 됨.
      //     this.loading = false;
      //   });

      // const req = new XMLHttpRequest();
      // req.open('GET', 'http://localhost:3000/health'); // 요청정보
      // req.send(); // 클라이언트에서 백엔드 서버로 요청이 됨
      // req.addEventListener('load', () => { // 요청이 완료되면 load이벤트가 발생함.
      //   this.loading = false;
      //   this.boards = {
      //     status: req.status,
      //     statusText: req.statusText,
      //     response: JSON.parse(req.response) // req.response는 순수 문자열로 오기때문에 JSON으로 파싱해줘야함
      //   }
      // });
    }
  }
}
</script>
