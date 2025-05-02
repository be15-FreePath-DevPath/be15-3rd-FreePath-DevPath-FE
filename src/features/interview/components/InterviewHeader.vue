<template>
  <div class="interview-header-row">
    <!-- 면접방 제목 -->
    <div class="header-cell clickable" @click="toggleTitleFilter">
      <img class="icon" src="@/assets/images/interview/ListFilter.png" />
      <span>면접방 제목</span>
      <FilterModal
          :visible="isTitleFilterOpen"
          v-if="isTitleFilterOpen"
          class="modal"
          @apply="applyTitleFilter"
          @update:visible="isTitleFilterOpen = $event"
      />
    </div>

    <!-- 면접방 종류 -->
    <div class="header-cell clickable" @click="toggleTypeFilter">
      <img class="icon" src="@/assets/images/interview/ListFilter.png" />
      <span>면접방 종류</span>
      <FilterModal
          :visible="isTypeFilterOpen"
          filter-type="category"
          v-if="isTypeFilterOpen"
          class="modal"
          @apply="applyTypeFilter"
          @update:visible="isTypeFilterOpen = $event"
      />
    </div>

    <!-- 면접 일시 -->
    <div class="header-cell">
      <span>면접 일시</span>
    </div>

    <!-- 점수 정렬 -->
    <div class="header-cell clickable" @click="toggleScoreSort">
      <img class="icon" src="@/assets/images/interview/ListSort.png" />
      <span>점수</span>
      <SortModal
          :visible="isScoreModalOpen"
          v-if="isScoreModalOpen"
          class="modal"
          @apply="applySort"
          @update:visible="isScoreModalOpen = $event"
      />
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import FilterModal from './FilterModal.vue'
import SortModal from './SortModal.vue'

const emit = defineEmits(['filter-change', 'sort-change'])

const isScoreModalOpen = ref(false)
const isTitleFilterOpen = ref(false)
const isTypeFilterOpen = ref(false)

const toggleTitleFilter = () => {
  isTitleFilterOpen.value = !isTitleFilterOpen.value
  isTypeFilterOpen.value = false
  isScoreModalOpen.value = false
}
const toggleTypeFilter = () => {
  isTypeFilterOpen.value = !isTypeFilterOpen.value
  isTitleFilterOpen.value = false
  isScoreModalOpen.value = false
}
const toggleScoreSort = () => {
  isScoreModalOpen.value = !isScoreModalOpen.value
  isTitleFilterOpen.value = false
  isTypeFilterOpen.value = false
}

const applyTitleFilter = (criteria) => {
  emit('filter-change', { type: 'title', value: criteria })
  isTitleFilterOpen.value = false
}
const applyTypeFilter = (category) => {
  emit('filter-change', { type: 'type', value: category })
  isTypeFilterOpen.value = false
}
const applySort = (order) => {
  emit('sort-change', order)
  isScoreModalOpen.value = false
}
</script>

<style scoped>
.interview-header-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 20px;
  gap: 16px;
  border-bottom: 1px solid rgba(28, 28, 28, 0.05);
  background-color: #ffffff;
  position: relative;
}

.header-cell {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(28, 28, 28, 0.4);
  font-weight: 500;
  position: relative; /* 💡 중요! */
}

.header-cell.clickable {
  cursor: pointer;
}

.icon {
  width: 20px;
  height: 20px;
}

.modal {
  position: absolute;
  top: 28px;
  left: 0;
  z-index: 10;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>