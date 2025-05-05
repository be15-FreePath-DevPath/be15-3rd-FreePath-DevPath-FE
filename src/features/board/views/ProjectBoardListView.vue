<template>
  <div class="project-board-list">
    <PostListHeaderBar />

    <!-- 로딩 중 메시지 또는 스켈레톤 -->
    <div v-if="isLoading">로딩 중입니다...</div>

    <!-- 로딩 끝났을 때만 PostList 보여줌 -->
    <PostList v-else :posts="posts" />
  </div>

  <div class="post-button-wrapper">
    <button class="post-button" @click="onWritePost">
      게시글 작성
    </button>
  </div>

  <PagingBar
      v-bind="pagination"
      @page-changed="handlePageChange"
  />
  <SearchBar @search="handleSearch" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchPostList } from '@/features/board/api.js';

import PostListHeaderBar from "@/features/board/components/PostListHeaderBar.vue";
import PagingBar from "@/components/common/PagingBar.vue";
import SearchBar from "@/features/board/components/SearchBar.vue";
import PostList from "@/features/board/components/PostList.vue";

const emit = defineEmits(['updateBreadCrumb']);

const router = useRouter();

const posts = ref([]);
const isLoading = ref(true);

const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
});

const lastSearchParams = ref({
  page: 1,
  size: 10,
  categoryId: 3,
  keyWord: undefined,
  nickname: undefined,
  startDate: undefined,
  endDate: undefined
});

function onWritePost() {
  router.push('/board/write');
}

onMounted(() => {
  emit('updateBreadCrumb', ['게시판', '프로젝트 매칭 게시판']);
  fetchAndSetPosts({
    page: 1,
    size: 10,
    categoryId: 3
  });
});

async function fetchAndSetPosts(params) {
  isLoading.value = true;

  try {
    const response = await fetchPostList(params);
    const apiResponse = response.data;

    if (!apiResponse.success || !apiResponse.data) {
      throw new Error('API 응답이 올바르지 않습니다.');
    }

    const { posts: postList, pagination: pageInfo } = apiResponse.data;

    posts.value = postList.map(post => ({
      id: post.boardId,
      text: post.boardTitle,
      date: new Date(post.boardCreatedAt).toLocaleString('ko-KR'),
      user: post.nickname
    }));

    pagination.currentPage = pageInfo.currentPage;
    pagination.totalPages = pageInfo.totalPage;
    pagination.totalItems = pageInfo.totalItems;
  } catch (e) {
    console.error('게시글 불러오기 실패:', e);
  } finally {
    isLoading.value = false;
  }
}

// 페이지 변경 처리
function handlePageChange(page) {
  fetchAndSetPosts({
    ...lastSearchParams.value,
    page
  });
}

// 검색 이벤트 처리
function handleSearch(params) {
  const sanitizedParams = {
    ...params,
    keyWord: params.keyWord?.trim() || undefined,
    nickname: params.nickname?.trim() || undefined,
    startDate: params.startDate || undefined,
    endDate: params.endDate || undefined,
    page: 1,
    size: 10,
    categoryId: 3
  };

  lastSearchParams.value = sanitizedParams;
  fetchAndSetPosts(sanitizedParams);
}
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

.post-button-wrapper {
  display: flex;
  justify-content: flex-end;
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
