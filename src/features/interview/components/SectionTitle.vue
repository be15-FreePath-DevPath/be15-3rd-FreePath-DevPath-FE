<script setup>
const props = defineProps({ title: String })
</script>

<template>
  <h3 class="section-title">{{ title }}</h3>
</template>

<style scoped>
.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
