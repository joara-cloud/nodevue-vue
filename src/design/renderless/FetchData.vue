<script>
export default {
	// 템플릿이 없고 js만 있음
	// renderless component : 표현을 하지않는 컴포넌트 (데이터만 제공함)
	props: ['url'],
	data() {
		return {
			response: null,
			loading: true
		}
	},
	created() {
		this.$http.get(this.url)
			.then(response => {
				this.response = response.data;
				this.loading = false
			})
			.catch(error => {
				alert('[ERROR] fetching the data', error)
				console.log(error);
			})
	},
	render() {
		return this.$scopedSlots.dafault({ // $scopedSlots 라고 하는 것은 컴포넌트를 그리는건데 그릴 때 컴포넌트의 표현 (html, css, ...)를 그리는게 아니라 그냥 데이터만 넘겨줌 (해당 컴포넌트를 동록한 곳에 데이터만 노출, 해당 예제에서는 Renderless.vue에 노출)
			response: this.response,
			loading: this.loading
		})
	}
}
</script>