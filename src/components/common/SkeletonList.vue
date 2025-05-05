<template>
  <div class="skeleton-list">
    <!-- 뼈대 아이템을 반복 렌더링 -->
    <div
        v-for="n in itemCount"
        :key="n"
        class="skeleton-item"
    >
      <div class="skeleton-title"></div>
      <div class="skeleton-subtitle"></div>
    </div>
  </div>
</template>

<script setup>
// 게시판/면접 목록 공통으로 쓰일 수 있도록 item 수만 props로 받음
const props = defineProps({
  itemCount: {
    type: Number,
    default: 10,
  },
});
</script>

<style scoped>
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skeleton-item {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background: #f0f0f0;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

.skeleton-title {
  width: 40%;
  height: 16px;
  background-color: #ccc;
  margin-bottom: 8px;
  border-radius: 4px;
}

.skeleton-subtitle {
  width: 60%;
  height: 12px;
  background-color: #ddd;
  border-radius: 4px;
}

@keyframes pulse {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #ddd;
  }
  100% {
    background-color: #eee;
  }
}
</style>
