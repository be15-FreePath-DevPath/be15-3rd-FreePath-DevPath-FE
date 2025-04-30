<template>
  <div id="app">
    <DevPathSidebar />
  </div>
</template>

<script>
import DevPathSidebar from '@/components/DevPathSidebar.vue'

export default {
  name: 'App',
  components: {
    DevPathSidebar
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Inter, sans-serif;
}
#app {
  display: flex;
  height: 100vh;
}
</style>
