<template>
    <div class="project-board-list">
      <PostListHeaderBar/>
      <PostList :posts="posts"/>
    </div>
    <PagingBar
        v-bind="pagination"
    />
    <SearchBar/>
</template>

<script setup>
import { ref, reactive } from 'vue';
import PostListHeaderBar from "@/features/board/components/PostListHeaderBar.vue";
import PagingBar from "@/components/common/PagingBar.vue";
import SearchBar from "@/features/board/components/SearchBar.vue";
import PostList from "@/features/board/components/PostList.vue";

// 임시 게시글 데이터
const posts = ref([
  { text: '오늘의 질문 있습니다', date: '3.15 토 14:39', user: '홍길동' },
  { text: '어떤 기술을 배우고 싶으신가요?', date: '3.16 일 10:00', user: '김철수' },
]);
const pagination = reactive({
  currentPage : 1,
  totalPages : 1,
  totalItems : 0
});
</script>

<style scoped>
.project-board-list {
  background-color: #F7F9FB;
  border-radius: 16.5px;
  padding: 27px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  width: auto;
  height: auto;
}
</style>
