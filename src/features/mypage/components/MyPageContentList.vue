<script setup>
import BookmarkList from "@/features/mypage/bookmark/components/BookmarkList.vue";
import LikeList from "@/features/mypage/like/components/LikeList.vue";
import CommentList from "@/features/mypage/comment/components/CommentList.vue";
import ReportCommentList from "@/features/mypage/comment/components/ReportCommentList.vue";
import ReportedPostList from "@/features/mypage/reportedpost/components/ReportedPostList.vue";
import WritePostList from "@/features/mypage/writepost/components/WritePostList.vue";

const props = defineProps(['selectedMain', 'selectedSub'])
</script>

<template>
  <div class="content-frame">
    <div class="content">
      <div v-if="selectedSub === '작성한 게시물'">
        <WritePostList />
      </div>
      <div v-if="selectedSub === '북마크한 게시물'">
        <BookmarkList />
      </div>
      <div v-if="selectedSub === '좋아요한 게시물'">
        <LikeList />
      </div>
      <div v-if="selectedSub === '신고된 게시물'">
        <ReportedPostList />
      </div>
      <div v-if="selectedSub === '작성한 댓글'">
        <CommentList />
      </div>
      <div v-if="selectedSub === '신고된 댓글'">
        <ReportCommentList />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-frame {
  width: 836px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}


</style>