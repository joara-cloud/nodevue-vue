<template>
  <div class="add-card">
    <form v-on:submit.prevent="onSubmit">
      <input class="form-control" type="text" v-model="inputTitle" ref="inputText">
      <button class="btn btn-success" type="submit" :disabled="invalidInput">Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
	props: ['listId'], // List.vue에서 내려받기
  data() {
    return {
      inputTitle: ''
    }
	},
	computed: {
		invalidInput() {
			return !this.inputTitle.trim()
		}
	},
	mounted() { // List.vue(부모) 컴포넌트에서 if문 조건이 맞아서 보여질때 그 시점에 인풋에 포커스!!!
		this.$refs.inputText.focus()
		this.setupClickOutside(this.$el) // this.$el : addCard 컴포넌트의 엘레먼트가 날라감
	},
	beforeDestroy() {
		// document.querySelector('body').removeEventListener('click', ...)
		// beforeDestory에서 removeEventListener() 함수로 등록한 이벤트도 제거하는게 맞을 것 같습니다. 아직 실습은 못해봄..
	},
	methods: {
		...mapActions([
			'ADD_CARD'
		]),
		onSubmit() {
			if(this.invalidInput) return // 값이 없으면 return
			const {inputTitle, listId} = this
			this.ADD_CARD({title: inputTitle, listId}) // actions에서 받을때 인자가 총 3개이지만 pos(좌표값)은 필수값이 아니게 짜여있으므로 필요한 두개만 전달
				.finally(() => this.inputTitle = '')
		},
		setupClickOutside(el) {
			document.querySelector('body').addEventListener('click', e => {
				console.log(el.contains(e.target));
				if(el.contains(e.target)) return // contains 함수 : 클릭한 엘리먼트를 포함하고있는지 -> 포함하고 있다면 현재 컴포넌트를 클릭한거기 때문에 아무동작하지 않기
				this.$emit('close') // 현재 컴포넌트를 클릭하지 않았다면 close 이벤트 (add card컴포넌트 닫기)
			})
		}
	},
}
</script>

<style>
.btn:disabled {
	opacity:0.6;
}
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>