<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  initialSort: String
})
const emit = defineEmits(['update:visible', 'apply'])

const selectedSort = ref(props.initialSort || 'desc')

const closeModal = () => {
  emit('update:visible', false)
}

const applySort = () => {
  emit('apply', selectedSort.value)
  closeModal()
}

// prop이 변경되면 로컬 상태 초기화
watch(() => props.initialSort, (newVal) => {
  selectedSort.value = newVal || 'desc'
})
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>정렬 기준</h3>

      <div class="sort-options">
        <label>
          <input type="radio" value="asc" v-model="selectedSort" />
          점수 오름차순
        </label>
        <label>
          <input type="radio" value="desc" v-model="selectedSort" />
          점수 내림차순
        </label>
      </div>

      <div class="actions">
        <button @click="closeModal">취소</button>
        <button @click="applySort">적용</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px 24px;
  border-radius: 8px;
  width: 280px;
}
h3 {
  margin-bottom: 14px;
}
.sort-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
label {
  font-size: 14px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
button {
  padding: 6px 12px;
  border: none;
  background: #eee;
  cursor: pointer;
  border-radius: 4px;
}
button:last-child {
  background: #7a74f7;
  color: white;
}
</style>
