<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  initialFilters: Object
})
const emit = defineEmits(['update:visible', 'apply'])

const localFilters = ref({
  difficulty: props.initialFilters?.difficulty || '',
  strictness: props.initialFilters?.strictness || ''
})

// 모달 닫기
const closeModal = () => {
  emit('update:visible', false)
}

// 적용 버튼
const applyFilters = () => {
  emit('apply', { ...localFilters.value })
  closeModal()
}

// prop 변경 시 로컬 필터도 초기화
watch(() => props.initialFilters, newVal => {
  localFilters.value = { ...newVal }
}, { deep: true })
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>필터 설정</h3>

      <div class="filter-group">
        <label>난이도</label>
        <select v-model="localFilters.difficulty">
          <option value="">전체</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div class="filter-group">
        <label>평가 기준</label>
        <select v-model="localFilters.strictness">
          <option value="">전체</option>
          <option value="general">General</option>
          <option value="normal">Normal</option>
          <option value="strict">Strict</option>
        </select>
      </div>

      <div class="actions">
        <button @click="closeModal">취소</button>
        <button @click="applyFilters">적용</button>
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
  background: #fff;
  padding: 20px 24px;
  border-radius: 8px;
  width: 300px;
}
h3 {
  margin-bottom: 12px;
}
.filter-group {
  margin-bottom: 16px;
}
label {
  font-size: 14px;
  display: block;
  margin-bottom: 4px;
}
select {
  width: 100%;
  padding: 6px;
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
