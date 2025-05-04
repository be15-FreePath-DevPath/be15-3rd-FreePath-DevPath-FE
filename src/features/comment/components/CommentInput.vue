<template>
  <div class="comment-input">
    <div class="input-area">
      <textarea
          v-model="newComment"
          placeholder="댓글을 입력하세요..."
          class="input-box"
          rows="3"
      ></textarea>
      <div class="actions">
        <button @click="submitComment" class="submit-button" :disabled="!newComment.trim()">등록</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['submit'],
  data() {
    return {
      newComment: ''
    };
  },
  methods: {
    submitComment() {
      if (this.newComment.trim()) {
        this.$emit('submit', this.newComment.trim());
        this.newComment = '';
      }
    }
  }
};
</script>

<style scoped>
.comment-input {
  display: flex;
  padding: 10px;
  border-bottom: 2px solid #eee;
}

.input-area {
  flex-grow: 1;
}

.input-box {
  width: 99%;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  font-size: 0.95em;
  font-family: inherit;
}

.actions {
  margin-top: 6px;
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  font-size: 0.9em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
