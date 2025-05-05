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
        <button
            v-if="isEditing"
            @click="cancelEdit"
            class="cancel-button"
            type="button"
        >
          취소
        </button>
        <button
            @click="submitComment"
            class="submit-button"
            :disabled="!newComment.trim()"
        >
          등록
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Props & Emits
const props = defineProps({
  initialValue: {
    type: String,
    default: '',
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['submit', 'cancel']);

// Local State
const newComment = ref(props.initialValue);

// Watch for prop changes (e.g. when editing a different comment)
watch(() => props.initialValue, (val) => {
  newComment.value = val;
});

// Methods
const submitComment = () => {
  if (newComment.value.trim()) {
    emit('submit', newComment.value.trim());
    newComment.value = '';
  }
};

const cancelEdit = () => {
  emit('cancel');
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
  gap: 10px;
}

.submit-button,
.cancel-button {
  padding: 6px 12px;
  font-size: 0.9em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button {
  background-color: #007bff;
  color: white;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
}
</style>
