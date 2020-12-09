<template>
	<div class="add-list">
		<input v-if="isAddList" type="text" class="form-control" v-model="inputTitle" ref="inputTitle" @blur="restore" @keyup.enter="onSubmitTitle">
		<a href="" v-else @click.prevent="onAddList">&plus; Add another list</a>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
	data() {
		return {
			isAddList: false,
			inputTitle: ''
		}
	},
	computed: {
		...mapState([
			'board'
		])
	},
	methods: {
		...mapActions([
			'ADD_LIST'
		]),
		onAddList() {
			this.isAddList = true
			this.$nextTick(() => this.$refs.inputTitle.focus()) // 랜더링 사이클에 의해 다음 틱에서 돌아야하기때문에 nextTick
		},
		restore() { // blur event
			this.isAddList = false
			this.inputTitle = ''
		},
		onSubmitTitle() { // submit 
			this.inputTitle = this.inputTitle.trim()
			if(!this.inputTitle) return this.restore()

			const title = this.inputTitle
			const boardId = this.board.id
			const lastList = this.board.lists[this.board.lists.length-1] // 마지막 리스트 가져오기
			const pos = lastList ? lastList.pos * 2 : 65535

			this.ADD_LIST({title, boardId, pos})
				.then(() => this.restore()) // 리스트 추가 완료 후 폼 초기화
		}
	}
}
</script>

<style>
.add-list {padding:12px;color:#ddd;background-color:rgba(0, 0, 0, 0.1);transition:all .3s}
.add-list a {color:#ddd}
.add-list:hover,.add-list:focus {background-color:rgba(0, 0, 0, 0.3)}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>