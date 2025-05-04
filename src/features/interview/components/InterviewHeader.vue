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
    <div class="header-title clickable" @click="toggleTitleFilter">
      <img class="icon" src="@/assets/images/interview/ListFilter.png" />
      <span>면접방 제목</span>
      <FilterDropdown
          v-if="isTitleFilterOpen"
          filterType="title"
          @apply="applyTitleFilter"
      />
    </div>
    <div class="header-type clickable" @click="toggleTypeFilter">
      <img class="icon" src="@/assets/images/interview/ListFilter.png" />
      <span>면접방 종류</span>
      <FilterDropdown
          v-if="isTypeFilterOpen"
          filterType="category"
          @apply="applyTypeFilter"
      />
    </div>
    <div class="header-date">
      <span>면접 일시</span>
    </div>
    <div class="header-score clickable" @click="toggleScoreDropdown">
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
  width: var(--interview-width);
  height: 40px;
  align-items: center;
  padding: 0 0;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(28, 28, 28, 0.05);
  background-color: #ffffff;
  font-size:12px
}

.header-title {
  width: var(--column-title);
  display: flex;
  align-items: center;
  padding: 12px 8px;
  gap: 6px;
}
.header-type {
  width: var(--column-type);
  display: flex;
  align-items: center;
  padding: 12px 8px;
  gap: 6px;
}
.header-date {
  width: var(--column-date);
  display: flex;
  align-items: center;
  padding: 12px 8px;
}
.header-score {
  width: var(--column-score);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  gap: 6px;
}


.icon {
  width: 20px;
  height: 20px;
}
</style>


