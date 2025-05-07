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
        @routeChat = "(userId) => $emit('routeChat',userId)"
    />

    <!-- 기본 댓글 입력창 -->
    <div class="default-input-wrapper">
      <CommentInput @submit="submitMainComment" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import CommentItem from './CommentItem.vue';
import CommentInput from './CommentInput.vue';
import { deleteComment, reportComment, saveComment, updateComment } from "@/features/comment/api.js";
import { useRoute } from "vue-router";

const props = defineProps({
  comments: {
    type: Array,
    required: true
  }
});

const localComments = ref([...props.comments]);

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

const route = useRoute();
const boardId = computed(() => Number(route.params.id));

const submitReply = async ({ parentId, content }) => {
  try {
    const response = await saveComment({ parentCommentId: parentId, contents: content });
    const newReply = response.data.data;

    // 새로운 객체를 만들어서 반응성 보장
    const updated = localComments.value.map(comment => {
      if (comment.commentId === parentId) {
        const updatedReplies = comment.replies ? [...comment.replies, newReply] : [newReply];
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });

    localComments.value = updated;
    replyingToId.value = null;
  } catch (e) {
    const msg = e?.response?.data?.message || '답글 작성 중 오류가 발생했습니다.';
    alert(msg);
  }
};

const submitMainComment = async (content) => {
  try {
    const response = await saveComment({ postId: boardId.value, contents: content });
    const newComment = response.data.data;
    localComments.value = [...localComments.value, newComment];
  } catch (e) {
    const msg = e?.response?.data?.message || '댓글 작성 중 오류가 발생했습니다.';
    alert(msg);
  }
};

const onDelete = async (id) => {
  if (!confirm('정말 삭제하시겠습니까?')) return;
  try {
    await deleteComment(id);
    alert('삭제되었습니다.');
    localComments.value = localComments.value.filter(c => c.commentId !== id);
  } catch (e) {
    const message = e?.response?.data?.message || '삭제 중 오류가 발생했습니다.';
    alert(message);
    console.error(e);
  }
};

function findCommentById(comments, commentId) {
  for (const comment of comments) {
    if (comment.commentId === commentId) {
      return comment;
    }
    if (comment.replies?.length > 0) {
      const found = findCommentById(comment.replies, commentId);
      if (found) return found;
    }
  }
  return null;
}

const onModify = async ({ commentId, content }) => {
  try {
    await updateComment(commentId, content);
    alert('댓글이 수정되었습니다.');

    const recursiveUpdate = (comments) =>
        comments.map(comment => {
          if (comment.commentId === commentId) {
            return { ...comment, contents: content };
          }
          if (comment.replies?.length > 0) {
            return { ...comment, replies: recursiveUpdate(comment.replies) };
          }
          return comment;
        });

    localComments.value = recursiveUpdate(localComments.value);
  } catch (e) {
    const message = e?.response?.data?.message || '수정 중 알 수 없는 오류가 발생했습니다.';
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
