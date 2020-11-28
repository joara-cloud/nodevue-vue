<template>
	<Modal>
		<div slot="header">
			<h2>
				Create new board
				<a href="" class="modal-default-button" @click.prevent="SET_IS_ADD_BOARD(false)">&times;</a>
			</h2>
		</div>
		<div slot="body">
			<form action="" id="add-board-form" @submit.prevent="addBoard">
				<input type="text" class="form-control" v-model="input" ref="input">
			</form>
		</div>
		<div slot="footer">
			<button class="btn" :class="{'btn-success': valid}" type="submit" form="add-board-form" :disabled="!valid">
				Create Board
			</button>
		</div>
	</Modal>
</template>

<script>
import Modal from './Modal.vue';
import {mapMutations, mapActions} from 'vuex'

export default {
  components: {
    Modal
	},
	data() {
		return {
			input: '',
			valid: false
		}
	},
	watch: {
		input(v) {
			this.valid = v.trim().length > 0; // 입력값이 있으면 true
		}
	},
	mounted() { // addBoard가 부모 컴포넌트에 mount됐을때
		this.$refs.input.focus();
	},
	methods: {
		...mapMutations([
			'SET_IS_ADD_BOARD',
			'SET_BOARDS'
		]),
		...mapActions([
			'ADD_BOARD',
			'FETCH_BOARDS'
		]),
		addBoard() {
			this.SET_IS_ADD_BOARD(false)
			this.ADD_BOARD({title:this.input})
				.then(({id}) => {
					this.$router.push(`/b/${id}`)
					// this.FETCH_BOARDS()
				})
		},
		
	}
}
</script>

<style>

</style>