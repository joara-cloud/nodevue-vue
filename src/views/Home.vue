<template>
  <div>
    <h2>Personal Board</h2>
    <div class="board-list" ref="boardList">
      <!-- <div class="board-item" v-for="b in boards" :key="b.id" :data-bgColor="b.bgColor" ref="boarddItem">
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{b.title}}</div>
        </router-link>
      </div> -->
      <div class="board-item board-item-new">
        <a href="" class="new-board-btn" @click.prevent="addBoard">
          Create new board...
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import {board} from '../api';

export default {
  data() {
    return {
      loading: false, 
      boards: [],
      error: ''
    }
  },
  beforeCreate() {
    console.log(this.$session.get("user_id"));
    if(!this.$session.get("user_id")) {
      this.$router.push('/login');
    }else {
      this.$router.push('/');
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

      // board.fetch()
        // .then(data => {
        //   this.boards = data.list;
        // })
        // .catch(err => {
        //   console.log(err);
        // })
        // .finally(() => {
        //   this.loading = false;
        // });
    },
    addBoard() {
      console.log('addBoard()');
    }
  }
}
</script>
