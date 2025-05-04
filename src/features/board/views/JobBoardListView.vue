<template>
  <div class="job-board-list">
    <PostListHeaderBar/>
    <PostList :posts="posts"/>
  </div>
  <div class="post-button-wrapper">
    <button class="post-button" @click="onWritePost">
      게시글 작성
    </button>
  </div>
  <PagingBar
      v-bind="pagination"
  />
  <SearchBar/>
</template>

<script setup>
import {ref, reactive} from 'vue';
import PostListHeaderBar from "@/features/board/components/PostListHeaderBar.vue";
import PagingBar from "@/components/common/PagingBar.vue";
import SearchBar from "@/features/board/components/SearchBar.vue";
import PostList from "@/features/board/components/PostList.vue";
import {useRouter} from "vue-router";

// 임시 게시글 데이터
const posts = ref([
  {text: '오늘의 질문 있습니다', date: '3.15 토 14:39', user: '홍길동'},
  {text: '어떤 기술을 배우고 싶으신가요?', date: '3.16 일 10:00', user: '김철수'},
]);
const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
});
const router = useRouter();

function onWritePost() {
  router.push('/board/write')
}
</script>

<style scoped>
.job-board-list {
  background-color: #F7F9FB;
  border-radius: 16.5px;
  padding: 27px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: auto;
  height: auto;
}

.post-button-wrapper {
  display: flex;
  justify-content: flex-end; /* 우측 정렬 */
  margin-top: 12px;
}

.post-button {
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
}

.post-button:hover {
  background-color: #0056b3;
}

</style>
