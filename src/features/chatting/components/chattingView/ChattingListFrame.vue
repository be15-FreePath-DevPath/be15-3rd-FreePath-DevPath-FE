<script setup>
import ChattingCard from './ChattingCard.vue'
import DateDivider from './DateDivider.vue'
import { defineProps, ref, watch, nextTick, computed } from 'vue'

const props = defineProps({
  chattings: {
    type: Array,
    default: () => []
  }
})

const listRef = ref(null)

// 날짜별로 그룹화된 채팅 생성
const groupedChattings = computed(() => {
  const groups = []
  let lastDate = null

  props.chattings.forEach(chat => {
    const dateStr = chat.timestamp.slice(0, 10) // 'YYYY-MM-DD'
    if (lastDate !== dateStr) {
      groups.push({ type: 'divider', date: dateStr })
      lastDate = dateStr
    }
    if(chat.userId === 1)
      groups.push({ type: 'divider', data: chat.message })
    else
    groups.push({ type: 'chat', data: chat })
  })

  return groups
})

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
    <template v-for="(item, index) in groupedChattings" :key="index">
      <DateDivider v-if="item.type === 'divider'" :date="item.date" :data="item.data"/>
      <ChattingCard v-else-if="item.type === 'chat'" :chatting="item.data" @userBlock="$emit('userBlock',item.data.userId)"/>
    </template>
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
