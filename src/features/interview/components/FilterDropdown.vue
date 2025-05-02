<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  filterType: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['apply'])

const selected = ref({
  difficulty: '',
  strictness: '',
  category: ''
})

const resetFilters = () => {
  selected.value = {
    difficulty: '',
    strictness: '',
    category: ''
  }
  emit('apply', {})
}

const applyFilters = () => {
  if (props.filterType === 'title') {
    if (selected.value.difficulty && selected.value.strictness) {
      emit('apply', {
        difficulty: selected.value.difficulty,
        strictness: selected.value.strictness
      })
    }
  } else if (props.filterType === 'category') {
    if (selected.value.category) {
      emit('apply', {
        category: selected.value.category
      })
    }
  }
}
</script>

<template>
  <div class="dropdown" @click.stop>
    <!-- 제목 필터용 -->
    <template v-if="filterType === 'title'">
      <div class="group">
        <label>난이도</label>
        <div class="button-row">
          <button
              v-for="level in ['easy', 'medium', 'hard']"
              :key="level"
              :class="{ selected: selected.difficulty === level }"
              @click.stop="selected.difficulty = level"
          >
            {{ level.toUpperCase() }}
          </button>
        </div>
      </div>

      <div class="group">
        <label>평가 기준</label>
        <div class="button-row">
          <button
              v-for="grade in ['generous', 'normal', 'strict']"
              :key="grade"
              :class="{ selected: selected.strictness === grade }"
              @click.stop="selected.strictness = grade"
          >
            {{ grade.toUpperCase() }}
          </button>
        </div>
      </div>
    </template>

    <!-- 분류 필터용 -->
    <template v-else>
      <div class="group">
        <label>면접 종류</label>
        <div class="button-column">
          <button
              v-for="cat in ['전체', '운영체제', '객체지향 프로그래밍', '데이터베이스', '네트워크', '디자인 패턴', '보안', 'CI/CD', '시스템 설계', '클라우드 & 인프라', '자료구조 & 알고리즘']"
              :key="cat"
              :class="{ selected: selected.category === cat }"
              @click.stop="selected.category = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </template>

    <div class="actions">
      <button class="reset" @click="resetFilters">초기화</button>
      <button class="apply" @click="applyFilters">적용</button>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: absolute;
  top: 36px;
  left: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  min-width: 300px;
  z-index: 10;
}

.group {
  margin-bottom: 16px;
}

label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 6px;
  display: block;
}

.button-row {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
}

.button-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

button {
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid #ddd;
  background-color: #f6f6f6;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}

button:hover {
  background-color: #eee;
}

.selected {
  background-color: #7a74f7;
  color: white;
  font-weight: bold;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}
.reset {
  background-color: #e0e0e0;
  color: #333;
}
.apply {
  background-color: #7a74f7;
  color: white;
}
</style>