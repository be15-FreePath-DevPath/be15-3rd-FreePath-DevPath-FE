<script setup>
import {reactive, onMounted, computed, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {deletePost, fetchPostDetail, reportPost, updatePost} from '@/features/board/api.js';

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
const router = useRouter();
const postId = route.params.id;
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

const handleDeletePost = async () => {
  if (!confirm('정말 게시글을 삭제하시겠습니까?')) return;
  try {
    await deletePost(postId);
    alert('삭제되었습니다.');
    router.push('/board'); // 혹은 다른 목록 경로
  } catch (e) {
    const msg = e?.response?.data?.message || '게시글 삭제 중 오류가 발생했습니다.';
    alert(msg);
  }
};

const handleModifyPost = async () => {
  const title = prompt('새 제목을 입력하세요', postDescription.title);
  const content = prompt('새 내용을 입력하세요', postDescription.content);
  if (!title?.trim() || !content?.trim()) return alert('제목과 내용은 비워둘 수 없습니다.');

  try {
    await updatePost(postId, { title, content });
    alert('수정되었습니다.');
    postDescription.title = title;
    postDescription.content = content;
  } catch (e) {
    const msg = e?.response?.data?.message || '게시글 수정 중 오류가 발생했습니다.';
    alert(msg);
  }
};

const handleReportPost = async () => {
  if (!confirm('이 게시글을 신고하시겠습니까?')) return;
  try {
    await reportPost(postId);
    alert('신고가 접수되었습니다.');
  } catch (e) {
    const msg = e?.response?.data?.message || '게시글 신고 중 오류가 발생했습니다.';
    alert(msg);
  }
};

</script>

<template>
  <div v-if="errorMessage" class="error-box">
    {{ errorMessage }}
  </div>

  <template v-else>
    <PostDescriptionBar
        :postDescription="postDescription"
        @delete="handleDeletePost"
        @modify="handleModifyPost"
        @report="handleReportPost"
    />
    <InteractionBar/>
    <CommentList :comments="comments"/>
    <PagingBar v-bind="pagination"/>
  </template>
</template>

<style scoped>
</style>
