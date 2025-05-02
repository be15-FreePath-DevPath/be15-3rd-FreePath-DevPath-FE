<script setup>
import CommentItem from "@/features/comment/components/CommentItem.vue";
import CommentInput from "@/features/comment/components/CommentInput.vue";

const { comments } = defineProps({
  comments: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div>
    <CommentItem
        v-for="(comment, index) in comments"
        :key="index"
        :commentId="comment.commentId"
        :nickname="comment.nickname"
        :contents="comment.contents"
        :createdAt="comment.createdAt"
        :modifiedAt="comment.modifiedAt"
        :likeCount="comment.likeCount"
    />
  </div>
  <CommentInput/>
</template>
