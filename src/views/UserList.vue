<template>
  <div>
    <div v-if="loading">
      loading user list...
    </div>
    <div v-else>
      <ul>
        <li v-for="(item, i) in userlist" v-bind:key="i">
          <p>user id : {{item.userid}}</p>
          <p>user name : {{item.name}}</p>
        </li>
      </ul>
    </div>
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
      userlist: [],
      loading: true
    }
  },
  created() {
    this.$http.post('/users/userlist')
      .then(response => {
        this.userlist = response.data;
        this.loading = false;
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