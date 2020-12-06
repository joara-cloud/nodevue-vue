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
  },
}
</script>

<style>
@import './assets/css/reset.css';
.content {max-width:1140px;width:100%;margin:0 auto;padding:35px 0 100px}
html, body, #app {
  height: 100%;
  margin: 0px;
}
#app {
  display: flex;
  flex-direction: column;
}
#wrap {height:100%}
.container {
  flex-grow: 1;
  position: relative;height:100%
}
.btn {
  border-radius: 3px;
  padding: 6px 8px;
  background-color: #e2e4e6;
  border: none;
  display: inline-block;
  color: #fff;
  font-size: 14px;
  line-height: 20px;  
  font-weight: 700;
  cursor: pointer;
}
.btn-success {
  background-color: #5aac44;
  box-shadow: 0 1px 0 #519839;
}
.form-control {
  width: 100%;
  box-sizing: border-box;
  background-color: #e2e4e6;
  border: 1px solid #cdd2d4;
  border-radius: 3px;
  display: block;
  margin-bottom: 12px;
  padding: 6px 8px;
  transition: background-color .3s;
}
input[type=text].form-control,
input[type=password].form-control,
textarea.form-control {
  font-size: 14px;
}
.form-control:focus {
  background-color: #fff;
}
</style>