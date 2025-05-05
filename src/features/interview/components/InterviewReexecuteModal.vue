<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-frame">

      <div class="modal-header">
        <h2 class="modal-title">면접방 재실행 설정</h2>
        <p class="modal-subtitle">새로운 조건으로 면접방을 재실행합니다.</p>
      </div>

      <div class="modal-section">
        <label for="difficulty">면접 난이도</label>
        <select id="difficulty" v-model="selectedDifficulty">
          <option value="EASY">EASY</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </select>
      </div>

      <div class="modal-section">
        <label for="strictness">평가 엄격도</label>
        <select id="strictness" v-model="selectedStrictness">
          <option value="GENEROUS">관대함</option>
          <option value="MODERATE">보통</option>
          <option value="STRICT">엄격함</option>
        </select>
      </div>

      <div class="modal-buttons">
        <button class="btn" @click="close">닫기</button>
        <button class="btn primary" @click="reexecute">면접 재실행하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  onClose: Function,
  onSubmit: Function
})

const selectedDifficulty = ref('MEDIUM')
const selectedStrictness = ref('STRICT')

const close = () => {
  props.onClose()
}

const reexecute = () => {
  props.onSubmit({
    difficulty: selectedDifficulty.value,
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
  background-image: url('@/assets/images/common/sidebar/ArrowDown.png '); /* 너가 사용하는 화살표 이미지 경로 */
  background-repeat: no-repeat;
  background-position: right 15px center; /* ← 이 값을 조정해서 더 안쪽으로 */
  background-size: 12px;
  appearance: none; /* 기본 OS 스타일 제거 */
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
