<template>
  <div id="content">
    <div class="about">
      About
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    loginUser() {
      this.$http.get('https://jsonplaceholder.typicode.com/users/1')
        .then(response => {
          if(response.data.id === 1) {
            console.log('사용자가 인증되었습니다.');
            this.$http.get('https://jsonplaceholder.typicode.com/todos')
              .then(response => {
                this.items = response.data;
              })
          }
        })
    },

    async loginUser2() {
      var response = await this.$http.get('https://jsonplaceholder.typicode.com/users/1');
      if(response.data.id === 1) {
        console.log('사용자가 인증되었습니다.');
        var list = await this.$http.get('https://jsonplaceholder.typicode.com/todos');
        this.items = list.data;
      }
    }
  }
}
</script>