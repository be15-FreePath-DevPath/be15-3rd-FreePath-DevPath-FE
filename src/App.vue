<template>
  <div id="app">
    <DevPathSidebar />
    <CsQuizMainView/>
  </div>
</template>

<script>
import DevPathSidebar from '@/components/DevPathSidebar.vue'
import CsQuizMainView from "@/features/csquiz/views/CsQuizMainView.vue";

export default {
  name: 'App',
  components: {
    CsQuizMainView,
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
