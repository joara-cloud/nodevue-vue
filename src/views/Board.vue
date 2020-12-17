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
          <!-- <span class="board-title">{{board.title}}</span>  -->
          <input type="text" class="board-title" v-bind:value="board.title" ref="boardTitle" :readonly="!isEditTitle" @click="isEditTitle=true" @blur="blurInput" @keyup.enter="blurInput"> 
          <!-- board는 전역상태에서 가져온 것 -->
          <a href="" class="board-header-btn show-menu" @click.prevent="onShowSettings">... Show Menu</a>
        </div>
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" v-bind:key="list.pos" :data-list-id="list.id">
              <List v-bind:data="list" />
            </div>
            <div class="list-wrapper">
              <add-list></add-list>
            </div>
          </div>
        </div>
      </div>
    </div>
    <board-settings v-if="isShowBoardSetting"></board-settings>
    <router-view></router-view> <!-- 중첩 라우팅 영역 -->
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import List from '../components/List.vue'
import AddList from '../components/AddList.vue'
import BoardSettings from '../components/BoardSetting'
import dragger from '../utils/dragger'

export default {
  components: {
    List,
    AddList,
    BoardSettings
  },
  data() {
    return {
      bid: 0,
      loading: false,
      cDragger: null, // dragula 객체 (card)
      lDragger: null, // dragula 객체 (list)
      isEditTitle: false,
    }
  },
  computed: {
    ...mapState([
      'board',
      'isShowBoardSetting'
    ])
  },
  created() {
    
    this.fetchData()
      .then(() => {
        this.SET_THEME(this.board.bgColor)
      });

    this.SET_IS_SHOW_BOARD_MENU(false)

  },
  updated() { // 보드 컴포넌트 내에 있는 자식 컴포넌트들이 모두 렌더링 된 후에 설정을 해줘야하는데 자식컴포넌트가 다 마운트 되는 시점인 updated에서 실행을 함
    this.setCardDragabble()
    this.setListDragabble()
  },
  methods: {
    ...mapActions([
      'FETCH_BOARD',
      'UPDATE_BOARD',
      'UPDATE_CARD',
      'UPDATE_LIST'
    ]),
    ...mapMutations([
      'SET_THEME',
      'SET_IS_SHOW_BOARD_MENU'
    ]),
    fetchData() {
      this.loading = true;
      return this.FETCH_BOARD({id: this.$route.params.bid}) // created에서 호출후 then함수를 쓰기 위해서 promise를 리턴해줘야 하기 때문에 'return' 키워드를 추가해서 반환해줌!!
        .then(() => {
          this.loading = false
        })
    },
    setCardDragabble() { // draggula 플러그인 세팅 (destroy -> init)
      if (this.cDragger) this.cDragger.destroy() // 기존 객체 삭제

      this.cDragger = dragger.init(Array.from(this.$el.querySelectorAll('.card-list'))) // container를 전달해줌, 유사배열이기 때문에 Array.from으로 처리 (옮겨질 .card-item를 감싸고 있는 .card-list를 선택)

      this.cDragger.on('drop', (el, wrapper, target, siblings) => { // 마우스를 뗄 때 발생하는 이벤트 (콜백함수가 전달해주는 인자가 4개)

        const targetCard = { // 어디로 이동해야할지 그 정보를 담고 있는 객체
          id: el.dataset.cardId * 1, // *1 : 문자열을 숫자로 바꿔줌 (card id를 받으려면 CardItem.vue에서 data속성을 설정)
          listId: wrapper.dataset.listId * 1,
          pos: 65535
        }
         
        const {prev, next} = dragger.siblings({ // dragger.js의 silblings에서 prev, next값을 가져옴
          el, 
          wrapper, 
          candidates: Array.from(wrapper.querySelectorAll('.card-item')), // 카드 리스트들을 전달해줌
          type: 'card'
        })

        if (!prev && next) targetCard.pos = next.pos / 2 // 첫 번째 카드일 때
        else if (!next && prev) targetCard.pos = prev.pos * 2 // 마지막 카드일 때
        else if (prev && next) targetCard.pos = (prev.pos + next.pos) / 2 // 중간 카드일 때
        
        this.UPDATE_CARD(targetCard)
      })
    },
    onShowSettings() {
      this.SET_IS_SHOW_BOARD_MENU(true)
    },
    blurInput() {
      const id = this.board.id
      const inputBoardTitle = this.$refs.boardTitle.value.trim()

      if(!inputBoardTitle) { // 입력값이 아무것도 없으면 return
        this.isEditTitle = false
        return
      } 

      if(this.board.title === inputBoardTitle) { // 기존 타이틀과 수정하려는 타이틀이 같으면 return
        this.isEditTitle = false
        return
      } 
      
      this.UPDATE_BOARD({id, title: inputBoardTitle, bgColor: this.board.bgColor})
        .then(() => {
          this.isEditTitle = false
        })
    },
    setListDragabble() {
      if (this.lDragger) this.lDragger.destroy() // 기존 객체 삭제

      const options = {
        invalid: (el, handle) => !/^list/.test(handle.className) // list로 시작하지 않는 클래스명을 가진 아이에게 invalid속성을 적용 (즉 .add-list에 적용)
      }
      this.lDragger = dragger.init(
        Array.from(this.$el.querySelectorAll('.list-section')), // container를 전달해줌, 유사배열이기 때문에 Array.from으로 처리 (옮겨질 item을 감싸고 있는 list-section을 선택)
        options // dragula api 자체에 두번쨰 인자로 option값을 받기때문에 여기서 option을 넘겨줌
      )

      this.lDragger.on('drop', (el, wrapper, target, siblings) => { // 마우스를 뗄 때 발생하는 이벤트 (콜백함수가 전달해주는 인자가 4개)
      
        const targetList = { // 어디로 이동해야할지 그 정보를 담고 있는 객체
          id: el.dataset.listId * 1, // *1 : 문자열을 숫자로 바꿔줌 (card id를 받으려면 CardItem.vue에서 data속성을 설정)
          pos: 65535
        }
         
        const {prev, next} = dragger.siblings({ // dragger.js의 silblings에서 prev, next값을 가져옴
          el, 
          wrapper, 
          candidates: Array.from(wrapper.querySelectorAll('.list')), // 카드 리스트들을 전달해줌
          type: 'list'
        })

        if (!prev && next) targetList.pos = next.pos / 2 // 첫 번째 카드일 때
        else if (!next && prev) targetList.pos = prev.pos * 2 // 마지막 카드일 때
        else if (prev && next) targetList.pos = (prev.pos + next.pos) / 2 // 중간 카드일 때
        
        this.UPDATE_LIST(targetList)
      })
    }
  }
}
</script>

<style>
/* .board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
} */
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
  outline:none
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
.board-title:read-only {border:0;background-color:transparent;cursor:pointer}
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
  padding: 0 10px 50px;
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