<script setup>
import { ref } from 'vue'
import InterviewHeader from './InterviewHeader.vue'
import InterviewItem from './InterviewItem.vue'

const props = defineProps({
  interviews: Array
})

// 부모 컴포넌트로 상태 전달해도 되고, 여기서 직접 가공해도 됨
const filterState = ref({})
const sortState = ref('desc')

const handleFilter = ({ type, value }) => {
  filterState.value[type] = value
  console.log('🔍 필터 변경됨:', filterState.value)
  // fetchInterviewList()
}

const handleSort = (order) => {
  sortState.value = order
  console.log('⬇️ 정렬 변경됨:', order)
  // fetchInterviewList()
}
</script>

<template>
  <div class="interview-list">
    <InterviewHeader
        @filter-change="handleFilter"
        @sort-change="handleSort"
    />
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
  gap: 16px;
}
</style>
