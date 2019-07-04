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
@import url('https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c&display=swap');
html,body{
  font-family: 'M PLUS Rounded 1c', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
