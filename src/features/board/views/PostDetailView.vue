<script setup>
import {reactive, onMounted, computed, ref} from 'vue';
import {useRoute} from 'vue-router';
import {fetchPostDetail} from '@/features/board/api.js';

import CommentList from "@/features/comment/components/CommentList.vue";
import PagingBar from "@/components/common/PagingBar.vue";
import InteractionBar from "@/features/interaction/components/InteractionBar.vue";
import PostDescriptionBar from "@/features/board/components/PostDescriptionBar.vue";
import {fetchCommentList} from "@/features/comment/api.js";

// 게시글 정보
const postDescription = reactive({
  category: '',
  title: '',
  author: '',
  createdAt: '',
  content: ''
});

const route = useRoute();

const postCategory = computed(() => route.query.category || '');

// 댓글 정보
const comments = ref([]);

const errorMessage = ref('');

const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
});

onMounted(async () => {
  const postId = route.params.id;

  // 게시글 정보 불러오기
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
      errorMessage.value = data.message || '게시글 정보를 불러올 수 없습니다.';
      console.error('유효하지 않은 게시글 응답:', data);
    }
  } catch (error) {
    //error.response && error.response.data && error.response.data.message
    errorMessage.value = error.response?.data?.message || '게시글 조회 중 오류가 발생했습니다.';
    console.error('게시글 상세 조회 실패:', error);
  }

  // 댓글 정보 불러오기
  try {
    const commentRes = await fetchCommentList(postId);
    const commentData = commentRes.data;

    if (commentData.success && Array.isArray(commentData.data)) {
      comments.value = commentData.data;
    } else {
      errorMessage.value = commentData.message || '댓글 정보를 불러올 수 없습니다.';
      console.error('댓글 응답이 유효하지 않습니다:', commentData);
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || '댓글 조회 중 오류가 발생했습니다.';
    console.error('댓글 조회 실패:', error);
  }
});
</script>

<template>
  <div v-if="errorMessage" class="error-box">
    {{ errorMessage }}
  </div>

  <template v-else>
    <PostDescriptionBar :postDescription="postDescription"/>
    <InteractionBar/>
    <CommentList :comments="comments"/>
    <PagingBar v-bind="pagination"/>
  </template>
</template>

<style scoped>
</style>
