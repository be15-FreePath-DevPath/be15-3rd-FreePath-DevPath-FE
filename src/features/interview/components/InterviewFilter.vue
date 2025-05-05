<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update:filters'])

// 각 필터 조건들
const difficulty = ref('')
const evaluation = ref('')
const category = ref('')
const scoreOrder = ref('')  // 'asc' or 'desc'

// 필터 변경 시 emit
watch([difficulty, evaluation, category, scoreOrder], () => {
  emit('update:filters', {
    difficulty: difficulty.value,
    evaluation: evaluation.value,
    category: category.value,
    scoreOrder: scoreOrder.value,
  })
})
</script>

<template>
  <div class="interview-filter">
    <div class="filter-group">
      <label>난이도</label>
      <select v-model="difficulty">
        <option value="">전체</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>

    <div class="filter-group">
      <label>평가기준</label>
      <select v-model="evaluation">
        <option value="">전체</option>
        <option value="general">General</option>
        <option value="normal">Normal</option>
        <option value="strict">Strict</option>
      </select>
    </div>

    <div class="filter-group">
      <label>면접 종류</label>
      <select v-model="category">
        <option value="">전체</option>
        <option value="os">운영체제</option>
        <option value="oop">객체 지향</option>
        <option value="db">데이터베이스</option>
        <!-- 필요시 더 추가 -->
      </select>
    </div>

    <div class="filter-group">
      <label>점수 정렬</label>
      <select v-model="scoreOrder">
        <option value="">기본</option>
        <option value="asc">점수 오름차순</option>
        <option value="desc">점수 내림차순</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.interview-filter {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  flex-wrap: wrap;
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
