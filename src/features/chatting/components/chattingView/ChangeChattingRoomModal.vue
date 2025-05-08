<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-container">
      <p class="modal-title">채팅방 이름</p>
      <input
          type="text"
          v-model="newTitle"
          placeholder="새로운 채팅방 이름"
          class="input"
      />
      <div class="modal-buttons">
        <button
            class="confirm"
            :disabled="!newTitle.trim()"
            @click="submit"
        >
          변경
        </button>
        <button class="cancel" @click="close">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit', 'close']);
const newTitle = ref('');

const submit = () => {
  emit('submit', newTitle.value);
};

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-container {
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 260px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.input {
  width: 90%;
  padding: 10px;
  background-color: #eee;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.confirm {
  background: none;
  border: none;
  color: #888;
  font-weight: bold;
  cursor: pointer;
}

.confirm:enabled {
  color: #2196f3;
}

.confirm:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.cancel {
  background: none;
  border: none;
  color: black;
  font-weight: bold;
  cursor: pointer;
}
</style>
