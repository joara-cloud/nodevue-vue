<template>
  <div id="header">
    <nav class="nav">
      <div class="inner">
        <h1><router-link to="/">AppName</router-link></h1>
        <ul class="gnb">
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/signup">Signup</router-link></li>
          <li><router-link to="/userlist">Userlist</router-link></li>
          <li><router-link to="/b/1">Board</router-link></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.inner {max-width:1140px;width:100%;margin:0 auto}
.nav {overflow:hidden;padding:14px 0;background-color:#eaeaea;}
.nav h1 {float:left;}
.nav .gnb {float:right;}
.nav .gnb > li {display:inline-block;margin-left:20px}
.nav .gnb > li > a {color:#555}
</style>