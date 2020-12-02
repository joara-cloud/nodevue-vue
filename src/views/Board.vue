<template>
  <div class="content">
    <!-- <div class="board">
      <div v-if="loading">loading board...</div>
      <div v-else>
        <div>bid : {{this.bid}}</div>
        <pre>
          {{ board }}
        </pre>
        <router-link v-bind:to="`/b/${bid}/c/1`">Card 1</router-link>
        <router-link v-bind:to="`/b/${bid}/c/2`">Card 2</router-link>
      </div>
      
      <hr />
      <router-view></router-view>
    </div> -->
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <span class="board-title">{{board.title}}</span> <!-- board는 전역상태에서 가져온 것 -->
        </div>
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" v-bind:key="list.pos">
              <List v-bind:data="list" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view> <!-- 중첩 라우팅 영역 -->
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import List from '../components/List.vue'


export default {
  components: {
    List
  },
  data() {
    return {
      bid: 0,
      loading: false,
      dragulaCard: null
    }
  },
  computed: {
    ...mapState([
      'board'
    ])
  },
  created() {
    this.fetchData();
    // this.bid = this.$route.params.bid;
  },
  updated() { // 보드 컴포넌트 내에 있는 자식 컴포넌트들이 모두 렌더링 된 후에 설정을 해줘야하는데 자식컴포넌트가 다 마운트 되는 시점인 updated에서 실행을 함
    if (this.dragulaCard) this.dragulaCard.destroy()

    this.dragulaCard = dragula([
      ...Array.from(this.$el.querySelectorAll('.card-list')), // container를 배열로 반환해야함. 유사배열이기 때문에 Array.from으로 처리 (옮겨질 .card-item를 감싸고 있는 .card-list를 선택)
    ]).on('drop', (el, wrapper) => { // 마우스를 뗄 때 발생하는 이벤트 (콜백함수가 전달해주는 인자가 4개)
      const targetCard = { // 어디로 이동해야할지 그 정보를 담고 있는 객체
        id: el.dataset.cardId * 1, // *1 : 문자열을 숫자로 바꿔줌 (card id를 받으려면 CardItem.vue에서 data속성을 설정)
        pos: 65535
      }

      // 앞 뒤에 어떤 카드들이 있는지 확인
      let prevCard = null
      let nextCard = null
      Array.from(wrapper.querySelectorAll('.card-item')) // wrapper는 움직이는 아이템을 감싸고 있는 .card-list이고, querySelectorAll은 유사배열이니깐 Array.from으로 뽑고 forEach 사용!!
        .forEach((el, idx, arr) => {
          const cardId = el.dataset.cardId * 1
          if (cardId == targetCard.id) { // 배열을 순회하고있는 cardId가 이동하고자 하는 카드(targetCard.id)와 동일하다면
            prevCard = idx > 0 ? { // 이동하고자 하는 카드가 첫번째 카드가 아님
              id: arr[idx - 1].dataset.cardId * 1,
              pos: arr[idx - 1].dataset.cardPos * 1,
            } : null // idx가 0이거나 0보다 작으면 맨앞에 있는거기때문에 이전카드는 없는것으로 판단 (null)

            nextCard = idx < arr.length-1 ? { // 마지막이 아니라면? 다음 카드가 있는거겠지
              id: arr[idx + 1].dataset.cardId * 1,
              pos: arr[idx + 1].dataset.cardPos * 1,
            } : null // idx가 마지막 배열보다 크면 다음 카드는 없는것으로 판단
          }
        })
      
      if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2 // 첫 번째 카드일 때
      else if (!nextCard && prevCard) targetCard.pos = prevCard.pos * 2 // 마지막 카드일 때
      else if (prevCard && nextCard) targetCard.pos = (prevCard.pos + nextCard.pos) / 2 // 중간 카드일 때

      this.UPDATE_CARD(targetCard)
    })
  },
  methods: {
    ...mapActions([
      'FETCH_BOARD',
      'UPDATE_CARD'
    ]),
    fetchData() {
      this.loading = true;
      this.FETCH_BOARD({id: this.$route.params.bid})
        .then(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
} 
.board-header input[type=text] {
  width: 200px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0,0,0,.15);
  cursor: pointer;
}
.board-title {
  font-weight: 700;
  font-size: 18px;
}
.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}
.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.card-item.gu-transit {
  background-color: #555 !important;
}
.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
/* .list-wrapper.gu-transit .list {
  background-color: #555 !important;
  color: #555 !important;
  opacity: 1 !important;
}
.list-wrapper.gu-mirror .list {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
} */
</style>