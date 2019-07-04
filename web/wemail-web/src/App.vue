<template>
  <div id="app">
    <Mail/>
  </div>
</template>

<script>

import Mail from './components/Mail.vue'

export default {
  name: 'app',
  components: {
    Mail
  }
}
</script>

<style>
#app {
  font-family: 'Kosugi Maru', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
