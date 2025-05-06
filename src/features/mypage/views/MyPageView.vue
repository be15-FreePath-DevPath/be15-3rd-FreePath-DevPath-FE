<template>
  <div class="tab-buttons">
    <button :class="{ active: tab === 'bookmark' }" @click="tab = 'bookmark'">북마크</button>
    <button :class="{ active: tab === 'like' }" @click="tab = 'like'">좋아요</button>
  </div>

  <div class="tab-content">
    <BookmarkList v-if="tab === 'bookmark'" />
    <LikeList v-if="tab === 'like'" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BookmarkList from '@/features/mypage/bookmark/components/BookmarkList.vue';
import LikeList from '@/features/mypage/like/components/LikeList.vue';

const tab = ref('bookmark');
</script>

<style scoped>
.tab-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  background: #e0e0e0;
  border-radius: 8px;
}

button.active {
  background: #2196f3;
  color: white;
}
</style>
