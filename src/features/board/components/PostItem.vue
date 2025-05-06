<template>
  <router-link
      :to="{ path: `/board/${id}`, query: { category } }"
      class="post-item"
  >
      <div class="item title">
        {{ text }}
      </div>
      <div class="item date">
        <img src="@/assets/images/board/CalendarIcon.png" alt="Calendar Icon" class="icon" />
        {{ date }}
      </div>
      <div class="item user">
        {{ user }}
      </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  id: { type: Number, required: true },   // ← 이 줄 추가
  text: { type: String, required: true },
  date: { type: String, required: true },
  user: { type: String, required: true },
  category: { type: String, required: true }
});

console.log(props.category);
</script>

<style scoped>
.post-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  width: auto;
  height: 65px;
  border-bottom: 1px solid #0000000d;
  font-size: 14px;
  text-decoration: none;
}

.item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  color: #000;
  font-weight: 400;
}

.title {
  justify-content: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.date {
  font-size: 12px;
  color: #1c1c1c;
  justify-content: center;
}

.user {
  justify-content: center;
}

.icon {
  width: 16px;
  height: 16px;
}
</style>
