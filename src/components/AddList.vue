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
			// 'ADD_LIST'
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
			// ADD_LIST()
		}
	}
}
</script>

<style>
.add-list {padding:12px;color:#ddd;background-color:rgba(0, 0, 0, 0.1);transition:all .3s}
.add-list a {color:#ddd}
.add-list:hover,.add-list:focus {background-color:rgba(0, 0, 0, 0.3)}
</style>