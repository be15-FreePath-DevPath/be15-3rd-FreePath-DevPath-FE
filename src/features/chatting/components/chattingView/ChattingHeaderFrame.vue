<template>
  <div class="chatting-header">
    <h2 class="room-title">{{ roomTitle }}</h2>
    <button class="options-button" @click="$emit('openOptions')">⋮</button>
  </div>
</template>

<script setup>
defineProps({
  roomTitle: String
});
</script>

<style scoped>
.chatting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  background-color: #f9f9f9;
}

.room-title {
  font-size: 18px;
  font-weight: bold;
}

.options-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
