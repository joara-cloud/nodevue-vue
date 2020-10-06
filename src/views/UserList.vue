<template>
  <div>
    <ul>
      <li v-for="(item, i) in userlist" v-bind:key="i">
        <p>user id : {{item.userid}}</p>
        <p>user name : {{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: '',
        name: ''
      },
      userlist: []
    }
  },
  created() {
    this.$http.post('/users/userlist')
      .then(response => {
        this.userlist = response.data;
      })
      .catch(err => {
        console.log(err);
        return;
      })
  }
}
</script>

<style>

</style>