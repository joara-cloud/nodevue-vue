<template>
  <div class="card-item" v-bind:data-card-id="data.id" :data-card-pos="data.pos">
		<router-link :to="`/b/${boardId}/c/${data.id}`">
			<div>{{data.title}}</div>
			<div class="card-item-meta" v-if="data.description">&equiv;</div>
		</router-link>
    <a href="" class="delete-card-btn" @click.prevent="onDelete">&times;</a>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  props: [
    'data'
	],
	computed: {
		...mapState({
			boardId: state => state.board.id
		})
  },
  methods: {
    ...mapActions([
      'DELETE_CARD'
    ]),
    onDelete () {
      if(!window.confirm('Delete this Card?')) return
      this.DELETE_CARD({id: this.data.id}) // id객체를 넘겨줘야하는데 props로 받은 data의 id를 보내줌
    }
  }
}
</script>

<style scoped>
.card-item {
  background-color: #fff;
  border-radius: 3px;
  margin: 8px;
  padding: 5px;
  box-shadow: 0 1px 0 #ccc;
  position: relative;
}
.card-item a {
  display:flex;
  justify-content:space-between;
  align-items:center;
  text-decoration: none;
  color: #444;
  word-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  font-size:14px;
  min-height:26px;
}
.card-item:hover,
.card-item:focus {
  background-color: rgba(0,0,0, .1);
  cursor: pointer;
}
.card-item-meta {
  font-size: 26px;
  color: #8c8c8c;  
}
.delete-card-btn {
  position: absolute;
  right: 10px;
  top: 4px;
  text-decoration: none;
  font-size: 18px;
  color: #aaa;
}
</style>