<!-- 상위 : Board.vue -->

<template>
	<div class="list">
		<div class="list-header">
      <input type="text" class="form-control input-title" v-if="isEditTitle" ref="inputTitle" v-model="inputTitle" @blur="onBlurTitle" @keyup.enter="onSubmitTitle">
			<div v-else class="list-header-title" @click="onClickTitle">{{data.title}}</div>
		</div>
		<div class="card-list">
			<card-item v-for="card in data.cards" v-bind:key="card.id" v-bind:data="card" />
		</div>
		<div v-if="isAddCard">
			<add-card v-on:close="isAddCard=false" v-bind:listId="data.id"></add-card>
		</div>
		<div v-else>
			<a href="" class="add-card-btn" @click.prevent.stop="isAddCard=true"> <!-- 버블링으로 상위엘리먼트가 클릭돼서 동작하지않음 그래서 stop으로 버블링 막아줌!! -->
				&plus; Add a card...
			</a>
		</div>
	
	</div>
</template>

<script>
import AddCard from './AddCard.vue'
import CardItem from './CardItem.vue'
import {mapActions} from 'vuex'

export default {
	components: {
		AddCard,
		CardItem
	},
  props: ['data'],
  created() {
    this.inputTitle = this.data.title
  },
	data() {
		return {
      isAddCard: false,
      isEditTitle: false,
      inputTitle: ''
		}
  },
  methods: {
    ...mapActions([
      'UPDATE_LIST'
    ]),
    onClickTitle() {
      this.isEditTitle = true
      this.$nextTick(() =>this.$refs.inputTitle.focus()); // 다음 렌더링 사이클에서 돌아가도록 nextTick
    },
    onBlurTitle() {
      this.isEditTitle = false
    },
    onSubmitTitle() {


      this.inputTitle = this.inputTitle.trim()
      if(!this.inputTitle) return // inputTitle이 없으면 리턴

      const id = this.data.id
      const title = this.inputTitle
      if(title == this.data.title) return

      this.UPDATE_LIST({id, title})
        .then(() => this.onBlurTitle())


    }
  }
}
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}
.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}
.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}
.input-title {
  width: 90%;
}
.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}
.card-list {
  flex: 1 1 auto;
  /* overflow-y: scroll; */
}
.empty-card-item   {
  height: 10px;
  width: 100%;
  background-color: rgba(0,0,0, 0);
}
.add-card-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}
.add-card-btn:focus,
.add-card-btn:hover {
  background-color: rgba(0,0,0, .1);
}
</style>