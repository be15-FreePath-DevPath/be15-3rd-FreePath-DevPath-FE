<template>
  <div class="post-regist-bar">
    <!-- 프로젝트 매칭 게시판일 때만 -->
    <div
        v-if="category === '프로젝트 매칭 게시판'"
        class="chat-options"
    >
      <label class="checkbox-label">
        <input
            type="checkbox"
            :checked="createChat"
            @change="$emit('update:createChat', $event.target.checked)"
        />
        채팅방 생성
      </label>

      <input
          v-if="createChat"
          type="text"
          class="chat-title-input"
          :value="chatTitle"
          :placeholder="title || '채팅방 제목을 입력하세요'"
          @input="$emit('update:chatTitle', $event.target.value)"
      />
    </div>

    <div class="button-group">
      <button class="btn primary" @click="$emit('register')">
        등록
      </button>
      <button class="btn secondary" @click="$emit('cancelClick')">
        취소
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  category:   { type: String, default: '' },
  title:      { type: String, default: '' },
  createChat: { type: Boolean, default: false },
  chatTitle:  { type: String, default: '' }
})

defineEmits([
  'update:createChat',
  'update:chatTitle',
  'register',
  'cancelClick'
])
</script>

<style scoped>
.post-regist-bar {
  padding: 16px;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-options {
  display: flex;
  align-items: center;
  gap: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.95rem;
  color: #333;
}

.chat-title-input {
  padding: 8px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: flex-end; /* 버튼 오른쪽 정렬 */
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  font-size: 0.95rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

.btn.primary {
  background-color: #007bff;
  color: #fff;
}

.btn.secondary {
  background-color: #f0f0f0;
  color: #333;
}

</style>
