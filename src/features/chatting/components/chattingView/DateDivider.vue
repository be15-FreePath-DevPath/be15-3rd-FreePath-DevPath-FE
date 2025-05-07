<!-- components/DateDivider.vue -->
<template>
  <div class="divider">
    <span class="label">{{ formattedDate }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  date: String, // '2025-05-06' 등
})

// 한국식 날짜 형식으로 변환
const dateObj = new Date(props.date)
const days = ['일', '월', '화', '수', '목', '금', '토']
const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 (${days[dateObj.getDay()]})`
</script>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  position: relative;
}
.label {
  background: #f0f0f0;
  padding: 6px 12px;
  font-size: 13px;
  color: #666;
  border-radius: 20px;
}
</style>
