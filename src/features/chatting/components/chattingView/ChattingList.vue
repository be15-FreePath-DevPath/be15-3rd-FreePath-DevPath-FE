<!-- components/chattingView/ChattingList.vue -->
<script setup>
import ChattingCard from './ChattingCard.vue'
import { defineProps } from 'vue'

const props = defineProps({
  chattingRooms: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="chattingList">
    <ChattingCard
        v-for="room in chattingRooms"
        :key="room.chattingRoomid"
        :room="room"
    />
  </div>
</template>

<style scoped>
.chattingList {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}
</style>
