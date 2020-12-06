<template>
	<div>
		<input type="checkbox" name="" id="" :value="value" @click="toggleCheckBox"> <!-- 내려온 value값을 엮어주고 클릭해서 값을 바꿀 때는 메서드를 이용함(toggleCheckBox)  -->
	</div>
</template>

<script>
export default {
	// v-model은 기본적으로 input 이벤트와 value 값으로 조작이 됨
	// 받을때는 value로 받고 input을 날리게 됨
	// 현재에서는 App.vue에서 v-model="checked" 이 부분이 value로 내려오게 됨 (props 받음!)
	props: ['value'],
	methods: {
		toggleCheckBox () {
			console.log(this.value);
			this.$emit('input', !this.value) // input을 올림 (value의 값도 같이 보내줌)
		}
	}
}
</script>

<style>

</style>