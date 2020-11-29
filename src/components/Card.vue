<template>
  <Modal>
    <div slot="header" class="moadl-card-header">
      <div class="modal-card-header-title">
        <input type="text" class="form-control" ref="inputTitle" :value="card.title" v-bind:readonly="toggleTitle" @click="toggleTitle=false" @blur="onBlurTitle">
      </div>
      <a href="" class="modal-close-btn" @click.prevent="onClose">&times;</a>
    </div>
    <div slot="body">
      <h3>Description</h3>
      <textarea name="" id="" cols="30" rows="3" class="form-control" placeholder="Add a more derailed description..." v-bind:readonly="toggleDesc" @click="toggleDesc=false" @blur="onBlurDesc" ref="inputDesc" v-model="card.description"></textarea>
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';
import {mapActions, mapState} from 'vuex';

export default {
  components: {
    Modal
  },
  data() {
    return {
      toggleTitle: true,
      toggleDesc: true,
    }
  },
  computed: {
    ...mapState([
      'card',
      'board'
    ])
  },
  created() {
    this.fetchCard()
  },
  methods: {
    ...mapActions([
      'FETCH_CARD',
      'UPDATE_CARD'
    ]),
    onClose() {
      this.$router.push(`/b/${this.board.id}`)
    },
    fetchCard() {
      const id = this.$route.params.cid
      this.FETCH_CARD({id})
    },
    onBlurTitle() {
      this.toggleTitle=true
      const title = this.$refs.inputTitle.value.trim()
      if(!title) return // title이 빈값이면 바로 빠져나감
      this.UPDATE_CARD({id: this.card.id, title})
        .then(() => this.fetchCard())
    },
    onBlurDesc() {
      this.toggleDesc = true
      const description = this.$refs.inputDesc.value.trim()
      if(!description) return
      this.UPDATE_CARD({id: this.card.id, description})
        .then(() => this.fetchCard())
    }
  }
}
</script>

<style>
.moadl-card-header {
  position: relative
}
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-card-header-title {
  padding-right: 30px;  
}
.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
}
</style>