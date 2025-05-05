<template>
  <div
      :class="['comment-wrapper', { reply: depth > 0 }]"
      :style="{ marginLeft: `${depth * 50}px` }"
  >
    <div class="comment-item">
      <img src="@/assets/images/board/ProfileImage.png" alt="프로필 이미지" class="profile-image" />
      <div class="comment-content">
        <div class="user-info">
          <span class="username">{{ comment.nickname }}</span>
          <span class="date">{{ formattedDate }}</span>
        </div>
        <p class="text">{{ comment.contents }}</p>
        <div class="actions">
          <button @click="likeComment" class="like-button">
            <img src="@/assets/images/board/HeartStraight.png" alt="좋아요" class="action-icon" />
            <span>{{ comment.likeCount || 0 }}</span>
          </button>
          <button v-if="depth === 0"
                  @click="replyToComment"
                  class="reply-button">답글쓰기</button>
          <div class="more-options">
            <img
                src="@/assets/images/board/Button.png"
                alt="더보기"
                class="action-icon"
                @click="toggleOptions"
            >
            <div
                v-if="isOptionsOpen"
                class="options-menu"
            >
              <button @click="deleteComment" class="report-button">댓글 삭제</button>
              <button @click="modifyComment" class="report-button">댓글 수정</button>
              <button @click="reportComment" class="report-button">댓글 신고</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 답글 입력창 -->
    <div v-if="replyingToId === comment.commentId" class="reply-input-wrapper">
      <CommentInput @submit="handleSubmitReply" />
    </div>

    <!-- 대댓글 재귀 렌더링 -->
    <CommentItem
        v-for="reply in comment.replies"
        :key="reply.commentId"
        :comment="reply"
        :depth="depth + 1"
        :replying-to-id="replyingToId"
        :active-options-id="activeOptionsId"
        @like="$emit('like', $event)"
        @reply="$emit('reply', $event)"
        @submit-reply="$emit('submit-reply', $event)"
        @delete="$emit('delete', $event)"
        @modify="$emit('modify', $event)"
        @report="$emit('report', $event)"
        @toggle-options="$emit('toggle-options', $event)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import CommentInput from './CommentInput.vue';

const props = defineProps({
  comment: Object,
  replyingToId: Number,
  activeOptionsId: Number,
  depth: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits([
  'like', 'reply', 'submit-reply', 'delete', 'modify', 'report', 'toggle-options'
]);

const likeComment = () => emit('like', props.comment.commentId);
const replyToComment = () => emit('reply', props.comment.commentId);
const toggleOptions = (event) => {
  emit('toggle-options', props.comment.commentId);
  event.stopPropagation();
};
const handleSubmitReply = (content) => {
  emit('submit-reply', { parentId: props.comment.commentId, content });
};
const deleteComment = () => emit('delete', props.comment.commentId);
const modifyComment = () => emit('modify', props.comment.commentId);
const reportComment = () => emit('report', props.comment.commentId);

const isOptionsOpen = computed(() => props.activeOptionsId === props.comment.commentId);

const formattedDate = computed(() =>
    new Date(props.comment.createdAt).toLocaleDateString()
);
</script>

<style scoped>
.comment-wrapper {
  margin-bottom: 10px;
}

.comment-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.comment-content {
  flex-grow: 1;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.username {
  font-weight: bold;
  margin-right: 8px;
}

.date {
  font-size: 0.8em;
  color: #777;
}

.text {
  margin-bottom: 8px;
  white-space: pre-line;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.like-button,
.reply-button,
.report-button {
  background: none;
  border: none;
  padding: 5px 8px;
  cursor: pointer;
  font-size: 0.9em;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 3px;
}

.action-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.more-options {
  position: relative;
}

.options-menu {
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.options-menu button {
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9em;
  white-space: nowrap;
}

.options-menu button:hover {
  background-color: #f0f0f0;
}

.reply-input-wrapper {
  margin-left: 50px;
  margin-top: 8px;
}
</style>
