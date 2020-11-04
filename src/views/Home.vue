<template>
  <div>
    <h2>Personal Board</h2>
    <div class="board-list" ref="boardList">
      <div class="board-item" v-for="b in boards" :key="b.id" :data-bgColor="b.bgColor" ref="boarddItem">
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{b.title}}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a href="" class="new-board-btn" @click.prevent="addBoard">
          Create new board...
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {board} from '../api';

export default {
  data() {
    return {
      loading: false, 
      boards: [],
      error: ''
    }
  },
  created() {
    this.fetchData();
  },
  updated() {
    this.$refs.boardItem.forEach(el => {
      el.style.backgroundColor = el.dataset.bgColor;
    })
  },
  methods: {
    fetchData() {
      this.loading = true;

      board.fetch()
        .then(data => {
          console.log(data.list);
          this.boards = data.list;
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
