<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-box">
      <p class="modal-title">{{ title }}</p>
      <p class="modal-message">{{ message }}</p>
      <div class="modal-button-wrap">
        <button class = "confirm-button" @click="$emit(modalAction)">{{ modalActionName }}</button>
        <button class="confirm-button" @click="close">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  message: String,
  modalActionName: String,
  modalAction: String
});
const emit = defineEmits(['close']);
const close = () => emit('close');

</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-box {
  background: white;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  min-width: 200px;
}

.modal-title {
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  margin-bottom: 4px;
}

.modal-message {
  font-size: 13px;
  color: #444;
  margin-bottom: 12px;
  text-align: left;
}

.modal-button-wrap {
  display: flex;
  justify-content: flex-end;
}

.confirm-button {
  background: none;
  border: none;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}
</style>
