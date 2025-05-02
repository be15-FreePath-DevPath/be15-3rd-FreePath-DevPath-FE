<script setup>
import { ref } from 'vue'
import FilterDropdown from './FilterDropdown.vue'
import SortDropdown from './SortDropdown.vue'

const emit = defineEmits(['filter-change', 'sort-change'])

const isTitleFilterOpen = ref(false)
const isTypeFilterOpen = ref(false)
const isScoreDropdownOpen = ref(false)

const toggleTitleFilter = () => {
  isTitleFilterOpen.value = !isTitleFilterOpen.value
  isTypeFilterOpen.value = false
  isScoreDropdownOpen.value = false
}
const toggleTypeFilter = () => {
  isTypeFilterOpen.value = !isTypeFilterOpen.value
  isTitleFilterOpen.value = false
  isScoreDropdownOpen.value = false
}
const toggleScoreDropdown = () => {
  isScoreDropdownOpen.value = !isScoreDropdownOpen.value
  isTitleFilterOpen.value = false
  isTypeFilterOpen.value = false
}

const applyTitleFilter = (filter) => {
  emit('filter-change', { type: 'title', value: filter })
  isTitleFilterOpen.value = false
}

const applyTypeFilter = (filter) => {
  emit('filter-change', { type: 'type', value: filter })
  isTypeFilterOpen.value = false
}
</script>

<template>
  <div class="interview-header-row">
    <!-- 면접방 제목 -->
    <div class="header-cell clickable">
      <div @click="toggleTitleFilter">
        <img class="icon" src="@/assets/images/interview/ListFilter.png" />
        <span>면접방 제목</span>
      </div>
      <FilterDropdown
          v-if="isTitleFilterOpen"
          filterType="title"
          @apply="applyTitleFilter"
      />
    </div>

    <!-- 면접방 종류 -->
    <div class="header-cell clickable">
      <div @click="toggleTypeFilter">
        <img class="icon" src="@/assets/images/interview/ListFilter.png" />
        <span>면접방 종류</span>
      </div>
      <FilterDropdown
          v-if="isTypeFilterOpen"
          filterType="category"
          @apply="applyTypeFilter"
      />
    </div>

    <!-- 면접 일시 -->
    <div class="header-cell">
      <span>면접 일시</span>
    </div>

    <!-- 점수 정렬 -->
    <div class="header-cell clickable" @click="toggleScoreDropdown">
      <img class="icon" src="@/assets/images/interview/ListSort.png" />
      <span>점수</span>
      <SortDropdown
          v-if="isScoreDropdownOpen"
          @select="(order) => {
          emit('sort-change', order)
          isScoreDropdownOpen.value = false
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.interview-header-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(28, 28, 28, 0.05);
  background-color: #ffffff;
  position: relative;
}

.header-cell {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(28, 28, 28, 0.4);
  position: relative;
}

.header-cell.clickable {
  cursor: pointer;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
