<template>
  <div>
    <div>bid : {{this.bid}}</div>
    <router-link v-bind:to="`/b/${bid}/c/1`">Card 1</router-link>
    <router-link v-bind:to="`/b/${bid}/c/2`">Card 2</router-link>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bid: 0
    }
  },
  created() {
    this.bid = this.$route.params.bid;
  }
}
</script>

<style>

</style>