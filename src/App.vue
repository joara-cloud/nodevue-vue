<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>

const defaultLayout = 'default';
export default {
  name: 'app',
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>

<style>
@import './assets/css/reset.css';
#container {max-width:1140px;width:100%;margin:0 auto;padding:80px 0}
</style>