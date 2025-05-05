<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  options: Array,
  selected: String
})
const emit = defineEmits(['update:selected'])

const selectedValue = ref(props.selected || '')

watch(selectedValue, (val) => emit('update:selected', val))
</script>

<template>
  <div class="option-grid">
    <div
        v-for="option in options"
        :key="option"
        :class="['option-item', { selected: option === selectedValue }]"
        @click="selectedValue = option"
    >
      {{ option }}
    </div>
  </div>
</template>

<style scoped>
.option-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.option-item {
  padding: 10px 16px;
  background-color: #E5ECF6;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
}

.option-item.selected {
  background-color: #E3F5FF;
}
</style>
