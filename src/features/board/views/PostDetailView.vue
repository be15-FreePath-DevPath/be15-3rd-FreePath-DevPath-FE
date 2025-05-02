<script setup>

// 더미 댓글 데이터
import CommentList from "@/features/comment/components/CommentList.vue";
import PagingBar from "@/components/common/PagingBar.vue";
import {reactive} from "vue";

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
]

const pagination = reactive({
  currentPage : 1,
  totalPages : 1,
  totalItems : 0
});

</script>

<template>
  <CommentList :comments="comments"/>
  <PagingBar v-bind="pagination"/>
</template>

<style scoped>

</style>