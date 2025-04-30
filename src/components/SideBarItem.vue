<!-- components/SideBarItem.vue -->
<template>
  <div class="sidebar-item">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'SideBarItem',
  props: {
    text: String
  }
}
</script>

<style scoped>
.sidebar-item {
  padding: 4px 12px;
  width: 100%;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
}
</style>
