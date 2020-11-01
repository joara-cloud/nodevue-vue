<template>
  <div>
    <div v-if="loading">loading card...</div>
    <div v-else>Card id :  {{this.cid }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cid: 0,
      loading: false
    }
  },
  watch: {
    // '$route'() {
    //   this.cid = this.$route.params.cid;
    // }
    '$route': {
      handler: 'fetchData',
      immediate: true // 핸들러에 등록된 함수가 즉시 실행되므로 따로 fetchData() 이런식으로 호출하지 않아도됨
    }
  },
  // created() {
  //   this.fetchData();
  // },
  methods: {
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.cid = this.$route.params.cid;
        this.loading = false;
      }, 500)
    }
  }
}
</script>
