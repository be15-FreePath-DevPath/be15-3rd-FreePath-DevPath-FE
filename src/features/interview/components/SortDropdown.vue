<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['select'])
const selected = ref(null)

const selectOption = (value) => {
  console.log('[SortDropdown] emit select:', value)
  selected.value = value
  emit('select', value)
}
</script>

<template>
  <div class="dropdown">
    <div
        class="dropdown-option"
        :class="{ selected: selected === 'asc' }"
        @click="selectOption('asc')"
    >
      점수 오름차순
    </div>
    <div
        class="dropdown-option"
        :class="{ selected: selected === 'desc' }"
        @click="selectOption('desc')"
    >
      점수 내림차순
    </div>
    <div class="divider"></div>
    <div
        class="dropdown-option reset"
        @click="selectOption(null)"
    >
      정렬 해제
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: absolute;
  top: 28px;
  left: 0;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 100;
  width: 180px;
  padding: 6px 0;
}

.dropdown-option {
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-option:hover {
  background-color: #f3f3f3;
}

.selected {
  font-weight: bold;
  color: #7a74f7;
}

.divider {
  height: 1px;
  background: #eee;
  margin: 6px 0;
}

.reset {
  color: #888;
}
</style>
