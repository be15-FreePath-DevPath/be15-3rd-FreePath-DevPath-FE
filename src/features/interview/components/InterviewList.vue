<script setup>
import InterviewItem from './InterviewItem.vue'

const props = defineProps({
  interviews: Array
})
</script>

<template>
  <div class="interview-list">
    <InterviewItem
        v-for="interview in interviews"
        :key="interview.id"
        :interview="interview"
    />
  </div>
</template>

<style scoped>
.interview-list {
  display: flex;
  flex-direction: column;
}
</style>
