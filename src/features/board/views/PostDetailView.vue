<script setup>
import {reactive, onMounted, computed} from 'vue';
import { useRoute } from 'vue-router';
import { fetchPostDetail } from '@/features/board/api.js';

import CommentList from "@/features/comment/components/CommentList.vue";
import PagingBar from "@/components/common/PagingBar.vue";
import InteractionBar from "@/features/interaction/components/InteractionBar.vue";
import PostDescriptionBar from "@/features/board/components/PostDescriptionBar.vue";

// 게시글 정보 (reactive로 선언)
const postDescription = reactive({
  category: '',
  title: '',
  author: '',
  createdAt: '',
  content: ''
});

const route = useRoute();

const postCategory = computed(() => route.query.category || '');

// 댓글 더미
const comments = [
  {
    commentId: 1,
    nickname: "홍길동",
    contents: "이 게시글 정말 유익하네요!",
    createdAt: "2025-05-02T14:30:00Z",
    modifiedAt: null,
    likeCount: 3
  },
  {
    commentId: 2,
    nickname: "임꺽정",
    contents: "동의합니다. 많은 도움이 됐어요.",
    createdAt: "2025-05-01T10:15:00Z",
    modifiedAt: "2025-05-01T11:00:00Z",
    likeCount: 5
  }
];

const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
});

onMounted(async () => {
  const postId = route.params.id;

  try {
    const response = await fetchPostDetail(postId);
    const data = response.data;

    if (data.success && data.data?.postDetailDto) {
      const dto = data.data.postDetailDto;
      postDescription.category = postCategory;
      postDescription.title = dto.boardTitle;
      postDescription.author = dto.nickname;
      postDescription.createdAt = dto.boardCreatedAt;
      postDescription.content = dto.boardContents;
    } else {
      console.error('유효하지 않은 게시글 응답:', data);
    }
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error);
  }
});
</script>

<template>
  <PostDescriptionBar :postDescription="postDescription" />
  <InteractionBar />
  <CommentList :comments="comments" />
  <PagingBar v-bind="pagination" />
</template>

<style scoped>
</style>
