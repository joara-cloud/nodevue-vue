<template>
  <div>
    <div v-if="loading">
      loading board...
    </div>
    <div v-else>
      <div>bid : {{this.bid}}</div>
      <router-link v-bind:to="`/b/${bid}/c/1`">Card 1</router-link>
      <router-link v-bind:to="`/b/${bid}/c/2`">Card 2</router-link>
    </div>
    
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bid: 0,
      loading: false
    }
  },
  created() {
    this.fetchData();
    // this.bid = this.$route.params.bid;
  },
  methods: {
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.bid = this.$route.params.bid;
        this.loading = false;
      }, 500)
    }
  }
}
</script>

<style>

</style>