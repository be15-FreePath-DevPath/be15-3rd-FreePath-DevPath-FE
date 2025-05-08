<template>
  <div class="paging-bar">
    <button
        class="nav-arrow"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)">
      &lt;
    </button>

    <span v-for="page in visiblePages" :key="page">
      <button
          :class="{ pageBtn: true, active: page === currentPage }"
          @click="changePage(page)">
        {{ page }}
      </button>
    </span>

    <button
        class="nav-arrow"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)">
      &gt;
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  totalItems: Number
});

const emit = defineEmits(['page-changed']);

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-changed', page);
  }
};

const visiblePages = computed(() => {
  const range = 2;
  const start = Math.max(1, props.currentPage - range);
  const end = Math.min(props.totalPages, props.currentPage + range);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});
</script>

<style scoped>
.paging-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 20px 0;
}

.pageBtn {
  background: transparent;
  border: none;
  padding: 6px 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.pageBtn:hover {
  background-color: #f0f0f0;
}

.pageBtn.active {
  background-color: #f1f1f1;
  font-weight: bold;
}

.nav-arrow {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  color: #333;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.nav-arrow:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.nav-arrow:disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>
