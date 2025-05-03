<script setup>
import ChattingCard from './ChattingCard.vue'
import { defineProps, ref, watch, nextTick } from 'vue'

const props = defineProps({
  chattings: {
    type: Array,
    default: () => []
  }
})

const listRef = ref(null)

// 채팅이 바뀔 때마다 스크롤 아래로
watch(
    () => props.chattings,
    async (newVal) => {
      if (newVal.length > 0) {
        await nextTick()
        if (listRef.value) {
          listRef.value.scrollTop = listRef.value.scrollHeight
        }
      }
    },
    { immediate: true, deep: true }
)
</script>

<template>
  <div class="chattingList" ref="listRef">
    <ChattingCard
        v-for="(chatting, index) in props.chattings"
        :key="index"
        :chatting="chatting"
    />
  </div>
</template>

<style scoped>
.chattingList {
  flex: 1;
  align-content: flex-end;
  overflow-y: auto;
  min-height: 0;
}
</style>
