<template>
  <div>
    <!-- 댓글 목록 -->
    <CommentItem
        v-for="comment in comments"
        :key="comment.commentId"
        :comment="comment"
        :replying-to-id="replyingToId"
        :active-options-id="activeOptionsId"
        @like="onLike"
        @reply="onReply"
        @submit-reply="submitReply"
        @delete="onDelete"
        @modify="onModify"
        @report="onReport"
        @toggle-options="onToggleOptions"
    />

    <!-- 기본 댓글 입력창 -->
    <div class="default-input-wrapper">
      <CommentInput @submit="submitMainComment" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import CommentItem from './CommentItem.vue';
import CommentInput from './CommentInput.vue';

const props = defineProps({
  comments: {
    type: Array,
    required: true
  }
});

const replyingToId = ref(null);
const activeOptionsId = ref(null);

const onLike = (id) => console.log('좋아요 클릭:', id);
const onReply = (id) => {
  replyingToId.value = replyingToId.value === id ? null : id;
};
const onToggleOptions = (id) => {
  activeOptionsId.value = activeOptionsId.value === id ? null : id;
};
const submitReply = ({ parentId, content }) => {
  console.log(`댓글 ${parentId}에 답글 작성:`, content);
  replyingToId.value = null;
};
const submitMainComment = (content) => console.log('기본 댓글 작성:', content);
const onDelete = (id) => console.log('댓글 삭제:', id);
const onModify = (id) => console.log('댓글 수정:', id);
const onReport = (id) => console.log('댓글 신고:', id);

const handleGlobalClick = (event) => {
  // 드롭다운 외부 클릭 시 닫기
  const isInsideMenu = event.target.closest('.options-menu');
  const isButton = event.target.closest('.action-icon');
  if (!isInsideMenu && !isButton) {
    activeOptionsId.value = null;
  }
};

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleGlobalClick);
});
</script>

<style scoped>
.default-input-wrapper {
  margin-top: 20px;
}
</style>
