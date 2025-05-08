<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-frame">
      <div class="modal-header">
        <h2 class="modal-title">면접방 재실행 설정</h2>
        <p class="modal-subtitle">평가 엄격도만 변경하여 면접을 재실행합니다.</p>
      </div>

      <div class="modal-section">
        <label for="strictness">평가 엄격도</label>
        <select id="strictness" v-model="selectedStrictness">
          <option value="GENEROUS">관대함</option>
          <option value="NORMAL">보통</option>
          <option value="STRICT">엄격함</option>
        </select>
      </div>

      <div class="modal-buttons">
        <button class="btn" @click="emit('close')">닫기</button>
        <button class="btn primary" @click="emitReexecute">면접 재실행하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  evaluationStrictness: {
    type: String,
    default: 'NORMAL'
  }
})

const emit = defineEmits(['close', 'reexecute'])

const selectedStrictness = ref(props.evaluationStrictness)

watch(
    () => props.evaluationStrictness,
    (newVal) => {
      selectedStrictness.value = newVal
    },
    { immediate: true }
)

const emitReexecute = () => {
  emit('reexecute', {
    strictness: selectedStrictness.value
  })
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-frame {
  background: #f7f9fb;
  border-radius: 16px;
  padding: 40px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.modal-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-title {
  font-size: 16px;
  color: #000;
  margin: 0;
}

.modal-subtitle {
  font-size: 12px;
  color: #888;
  margin: 0;
}

.modal-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.modal-section label {
  font-size: 14px;
  font-weight: 600;
}

select {
  height: 36px;
  padding: 6px 30px 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background-image: url('@/assets/images/common/sidebar/ArrowDown.png ');
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 12px;
  appearance: none;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn {
  all: unset;
  cursor: pointer;
  font-size: 14px;
  padding: 10px 16px;
  background-color: #eee;
  border-radius: 8px;
  text-align: center;
}

.btn.primary {
  background-color: #7094f4;
  color: white;
}
</style>
