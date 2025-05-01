<template>
  <div class="layout-default">
    <Sidebar />
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
</script>

<style scoped>
.layout-default {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f9f9f9;
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}
</style>
