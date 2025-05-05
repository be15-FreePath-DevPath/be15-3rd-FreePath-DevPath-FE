<template>
  <div>
    <!-- 댓글 목록 -->
    <CommentItem
        v-for="comment in localComments"
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
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import CommentItem from './CommentItem.vue';
import CommentInput from './CommentInput.vue';
import {deleteComment, reportComment, updateComment} from "@/features/comment/api.js";

const props = defineProps({
  comments: {
    type: Array,
    required: true
  }
});

// 로컬 상태로 복사해서 관리
const localComments = ref([...props.comments]);

// props.comments가 외부에서 변경되면 동기화
watch(() => props.comments, (newComments) => {
  localComments.value = [...newComments];
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

const submitMainComment = (content) => {
  console.log('기본 댓글 작성:', content);
};

const onDelete = async (id) => {
  if (!confirm('정말 삭제하시겠습니까?')) return;
  try {
    await deleteComment(id);
    alert('삭제되었습니다.');

    // ✅ 삭제 후 로컬 상태에서 반영
    localComments.value = localComments.value.filter(c => c.commentId !== id);
  } catch (e) {
    const message =
        e?.response?.data?.message || '삭제 중 오류가 발생했습니다.';
    alert(message);
    console.error(e);
  }
};

const onModify = async ({ commentId, content }) => {
  try {
    await updateComment(commentId, content);
    alert('댓글이 수정되었습니다.');

    // 내부에서 관리하는 commentId에 해당하는 content 값을 변경된 내용으로 덮어씌움
    const target = localComments.value.find(c => c.commentId === commentId);
    if (target) {
      target.contents = content;
    }
  } catch (e) {
    const message =
        e?.response?.data?.message || '수정 중 알 수 없는 오류가 발생했습니다.';
    alert(message);
    console.error(e);
  }
};

const onReport = async (commentId) => {
  try {
    const response = await reportComment(commentId);
    alert(response.data.message || '신고가 접수되었습니다.');
  } catch (e) {
    const msg = e?.response?.data?.message || '신고 중 오류가 발생했습니다.';
    alert(msg);
    console.error(e);
  }
};

const handleGlobalClick = (event) => {
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
