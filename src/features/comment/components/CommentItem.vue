<template>
  <div class="comment-item">
    <img src="@/assets/images/board/ProfileImage.png" alt="프로필 이미지" class="profile-image">
    <div class="comment-content">
      <div class="user-info">
        <span class="username">{{ nickname }}</span>
        <span class="date">{{ formattedDate }}</span>
      </div>
      <p class="text">{{ contents }}</p>
      <div class="actions">
        <button @click="likeComment" class="like-button">
          <img src="@/assets/images/board/HeartStraight.png" alt="좋아요" class="action-icon">
          <span>{{ likeCount }}</span>
        </button>
        <button @click="replyToComment" class="reply-button">답글</button>
        <div class="more-options" v-if="!isMine">
          <img src="@/assets/images/board/Button.png" alt="더보기" class="action-icon" @click="toggleOptions">
          <div v-if="showOptions" class="options-menu">
            <button @click="reportComment" class="report-button">신고</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    commentId: {
      type: Number,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    createdAt: {
      type: [String, Date],
      required: true
    },
    modifiedAt: {
      type: [String, Date],
      required: false,
      default: null
    },
    contents: {
      type: String,
      required: true
    },
    likeCount: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      showOptions: false,
      // commentText를 contents로 변경 (템플릿과 일관성 유지)
      // commentText: this.contents,
    };
  },
  methods: {
    likeComment() {
      this.$emit('like', this.commentId);
    },
    replyToComment() {
      this.$emit('reply', this.commentId);
    },
    reportComment() {
      this.$emit('report', this.commentId);
      this.showOptions = false;
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    }
  }
};
</script>

<style scoped>
/* 스타일은 그대로 유지 */
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
  white-space: pre-line; /* 줄바꿈 유지 */
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
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
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
}

.options-menu button:hover {
  background-color: #f0f0f0;
}
</style>