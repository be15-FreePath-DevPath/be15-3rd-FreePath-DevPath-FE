<template>
  <div
      :class="['comment-wrapper', { reply: depth > 0 }]"
      :style="{ marginLeft: `${depth * 50}px` }"
  >
    <div class="comment-item">
      <img
          src="@/assets/images/board/ProfileImage.png"
          alt="프로필 이미지"
          class="profile-image"
      />
      <div class="comment-content">
        <div class="user-info">
          <span class="username">{{ comment.nickname }}</span>
          <span class="date">{{ formattedDate }}</span>
        </div>

        <!-- 댓글 본문 / 수정 모드 -->
        <template v-if="!isEditing">
          <p class="text">{{ comment.contents }}</p>
        </template>
        <template v-else>
          <CommentInput
              :initial-value="editedContent"
              :is-editing="true"
              @submit="submitEdit"
              @cancel="cancelEdit"
          />
        </template>

        <div class="actions">
          <!-- 좋아요 버튼 -->
          <button @click="handleToggleLike" class="like-button">
            <img
                :src="isLiked ? likedIcon : unlikedIcon"
                alt="좋아요"
                class="action-icon"
            />
            <span>{{ likeCount }}</span>
          </button>

          <!-- 답글쓰기 -->
          <button
              v-if="depth === 0 && !isEditing"
              @click="replyToComment"
              class="reply-button"
          >
            답글쓰기
          </button>

          <!-- 더보기 옵션 -->
          <div class="more-options">
            <img
                src="@/assets/images/board/Button.png"
                alt="더보기"
                class="action-icon"
                @click="toggleOptions"
            />
            <div v-if="isOptionsOpen" class="options-menu">
              <button @click="deleteComment" class="report-button">
                댓글 삭제
              </button>
              <button @click="enableEditMode" class="report-button">
                댓글 수정
              </button>
              <button @click="reportComment" class="report-button">
                댓글 신고
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 답글 입력창 -->
    <div
        v-if="replyingToId === comment.commentId && !isEditing"
        class="reply-input-wrapper"
    >
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
import { computed, ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import CommentInput from './CommentInput.vue'

import likedIcon from '@/assets/images/board/BigHeartStraightRed.png'
import unlikedIcon from '@/assets/images/board/BigHeartStraight.png'

import {
  hasUserLikedComment,
  countLikesByCommentId,
  likeComment,
  unlikeComment
} from '@/features/comment/api.js'

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  replyingToId: Number,
  activeOptionsId: Number,
  depth: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits([
  'reply',
  'submit-reply',
  'delete',
  'modify',
  'report',
  'toggle-options'
])

// Toast 인스턴스 (이 컴포넌트만 중앙 토스트)
const toast = useToast({ position: 'top-center', timeout: 1500 })

// 로컬 에디트 상태
const isEditing = ref(false)
const editedContent = ref(props.comment.contents)

// 로컬 좋아요 상태
const isLiked = ref(false)
const likeCount = ref(0)

// 마운트 시 좋아요 정보 불러오기
onMounted(async () => {
  try {
    const [likedRes, countRes] = await Promise.all([
      hasUserLikedComment(props.comment.commentId),
      countLikesByCommentId(props.comment.commentId)
    ])
    isLiked.value = likedRes.data.data
    likeCount.value = countRes.data.data
  } catch (err) {
    console.error('댓글 좋아요 정보 로딩 실패:', err)
    isLiked.value = false
    likeCount.value = 0
  }
})

// 좋아요 토글 핸들러 (토스트 메시지 포함)
const handleToggleLike = async () => {
  try {
    if (isLiked.value) {
      await unlikeComment(props.comment.commentId)
      likeCount.value = Math.max(likeCount.value - 1, 0)
      toast.info('좋아요를 취소했습니다.')
    } else {
      await likeComment(props.comment.commentId)
      likeCount.value += 1
      toast.success('댓글을 좋아했어요!')
    }
    isLiked.value = !isLiked.value
  } catch (err) {
    console.error('댓글 좋아요 처리 실패:', err)
    toast.error('좋아요 처리 중 오류가 발생했습니다.')
  }
}

// 나머지 이벤트 핸들러
const replyToComment = () => emit('reply', props.comment.commentId)
const toggleOptions = (event) => {
  emit('toggle-options', props.comment.commentId)
  event.stopPropagation()
}
const deleteComment = () => emit('delete', props.comment.commentId)
const reportComment = () => emit('report', props.comment.commentId)
const enableEditMode = () => {
  editedContent.value = props.comment.contents
  isEditing.value = true
}
const cancelEdit = () => {
  isEditing.value = false
}
const submitEdit = (newContent) => {
  emit('modify', { commentId: props.comment.commentId, content: newContent })
  isEditing.value = false
}
const handleSubmitReply = (content) => {
  emit('submit-reply', { parentId: props.comment.commentId, content })
}

const isOptionsOpen = computed(
    () => props.activeOptionsId === props.comment.commentId
)
const formattedDate = computed(
    () => new Date(props.comment.createdAt).toLocaleDateString()
)
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
