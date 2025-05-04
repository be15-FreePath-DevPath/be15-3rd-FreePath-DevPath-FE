<script setup>

// 더미 댓글 데이터
import CommentList from "@/features/comment/components/CommentList.vue";
import PagingBar from "@/components/common/PagingBar.vue";
import {reactive} from "vue";
import InteractionBar from "@/features/interaction/components/InteractionBar.vue";
import PostDescriptionBar from "@/features/board/components/PostDescriptionBar.vue";

// 게시글 더미 데이터
const postDescription = {
  category: "자유게시판",
  title: "테스트용 제목입니다. 테스트용 제목입니다. 테스트용 제목입니다.",
  author: "개발자 취준생 103958",
  createdAt: "2025-04-24T17:50:00Z",
  content: "테스트입니다. 테스트입니다. 테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다.테스트입니다."
};

// 댓글 더미 데이터
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
  <PostDescriptionBar :postDescription="postDescription"/>
  <InteractionBar/>
  <CommentList :comments="comments"/>
  <PagingBar v-bind="pagination"/>
</template>

<style scoped>

</style>