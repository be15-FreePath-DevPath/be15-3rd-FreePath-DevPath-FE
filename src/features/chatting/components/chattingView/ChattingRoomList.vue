<!-- components/chattingView/ChattingRoomList.vue -->
<script setup>
import { defineProps } from 'vue'
import ChattingRoomCard from './ChattingRoomCard.vue'

const props = defineProps({
  rooms: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="chattingRoomList">
    <ChattingRoomCard
        v-for="room in rooms"
        :key="room.id"
        :room="room"
    />
  </div>
</template>

<style scoped>
.chattingRoomList {
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-right-color: #666666;
}
</style>
