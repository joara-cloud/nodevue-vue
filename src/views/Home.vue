<template>
  <div class="content">
    <h2>Personal Board</h2>
    <div class="board-list" ref="boardList">
      <div class="board-item" v-for="b in boards" :key="b.id" :data-bgColor="b.bgColor" ref="boardItem">
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{b.title}}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a href="" class="new-board-btn" @click.prevent="SET_IS_ADD_BOARD(true)">
          Create new board...
        </a>
      </div>
    </div>
    <add-board v-if="isAddBoard" @close="isAddBoard = false"></add-board> 
    <!-- 1. close이벤트가 발생하면 isAddBoard=false -->
    <!-- 2. 자식 컴포넌트(AddBoard.vue)에서 submit이벤트가 발생하면 onAddBoard함수가 실행 -->
  </div>
</template>

<script>
import {setAuthInHeader} from '../api';
import addBoard from '../components/AddBoard.vue';
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  data() {
    return {
      loading: false, 
      error: ''
    }
  },
  components: {
    addBoard
  },
  beforeCreate() {
    // console.log(this.$session.get("user_id"));
    // if(!this.$session.get("user_id")) {
    //   this.$router.push('/login');
    // }else {
    //   // this.$router.push({ name: 'home' });
    // }
  },
  computed: {
    ...mapState([
      'isAddBoard',
      'boards'
    ])
  },
  created() {
    this.fetchData();
    this.SET_THEME() // navBar.vue가 Board 목록이나 상세보기에도 모두 있기때문에 거기서 색상을 지정할꺼임
  },
  updated() {
    this.$refs.boardItem.forEach(el => {
      el.style.backgroundColor = el.dataset.bgcolor;
    })
  },
  methods: {
    ...mapMutations([
      'SET_IS_ADD_BOARD',
      'SET_THEME'
    ]),
    ...mapActions([
      'FETCH_BOARDS'
    ]),
    fetchData() {
      this.loading = true;
      
      setAuthInHeader(localStorage.getItem('token'));

      this.FETCH_BOARDS().finally(() => {
        this.loading = false;
      });
    },
    addBoard() {
      // this.isAddBoard = true;
      this.$store.commit('SET_IS_ADD_BOARD', true)
    }
  }
}
</script>
<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0,0,0, .1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
  background-color:#f5f5f5
}
</style>