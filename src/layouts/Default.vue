<template>
  <div id="wrap">
    <Navbar />
    <div id="container" class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
export default {
  components: {
    Navbar
  }
}
</script>