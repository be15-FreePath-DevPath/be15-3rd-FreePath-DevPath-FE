<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import DevPathSidebar from '@/components/layout/Sidebar.vue'
import AdminMainView from "@/features/admin/AdminMainView.vue";

export default {
  name: 'App',
  components: {
    AdminMainView,
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
