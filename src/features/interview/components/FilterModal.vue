<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  initialFilters: Object,
  filterType: {
    type: String,
    default: 'title'  // 'title' or 'category'
  }
})
const emit = defineEmits(['update:visible', 'apply'])

const localFilters = ref({
  difficulty: props.initialFilters?.difficulty || '',
  strictness: props.initialFilters?.strictness || '',
  category: props.initialFilters?.category || ''
})

const closeModal = () => {
  emit('update:visible', false)
}

const applyFilters = () => {
  emit('apply', { ...localFilters.value })
  closeModal()
}

watch(() => props.initialFilters, (newVal) => {
  localFilters.value = { ...newVal }
}, { deep: true })
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>필터 설정</h3>

      <!-- ✅ 면접방 제목 필터 -->
      <template v-if="filterType === 'title'">
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
      </template>

      <!-- ✅ 면접방 종류 필터 -->
      <template v-else-if="filterType === 'category'">
        <div class="filter-group">
          <label>면접 종류</label>
          <select v-model="localFilters.category">
            <option value="">전체</option>
            <option value="OS">운영체제</option>
            <option value="OOP">객체 지향 프로그래밍</option>
            <option value="DB">데이터베이스</option>
            <option value="NETWORK">네트워크</option>
            <option value="CS">컴퓨터 구조</option>
            <!-- 필요한 항목 더 추가 가능 -->
          </select>
        </div>
      </template>

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
