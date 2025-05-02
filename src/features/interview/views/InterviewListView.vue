<script setup>
import { ref, onMounted } from 'vue'
import SkeletonList from '@/components/common/SkeletonList.vue'
import PagingBar from '@/components/common/PagingBar.vue'
import InterviewList from '@/features/interview/components/InterviewList.vue'
import { fetchInterviewRooms } from '@/features/interview/api.js'
import LayoutDefault from "@/components/layout/LayoutDefault.vue";

const interviews = ref([])
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
})
const isLoading = ref(true)
const sortOrder = ref('desc')
const filters = ref({
  category: null,
  difficulty: null,
  evaluation: null
})

const loadInterviews = async (page = 1) => {
  isLoading.value = true
  try {
    const { data } = await fetchInterviewRooms({
      page,
      sortOrder: sortOrder.value,
      ...filters.value
    })
    interviews.value = data.interviews
    pagination.value = data.pagination
  } catch (e) {
    console.error('면접방 목록 로딩 실패', e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => loadInterviews())
</script>

<template>
  <layout-default>
    <div class="interview-list-view">
      <h2 class="title">면접방 목록</h2>

      <!-- 정렬/필터 UI는 나중에 InterviewFilter.vue로 분리 예정 -->

      <SkeletonList v-if="isLoading" />
      <InterviewList v-else :interviews="interviews" />

      <PagingBar
          v-bind="pagination"
          @page-changed="loadInterviews"
      />
    </div>
  </layout-default>

</template>

<style scoped>
.interview-list-view {
  padding: 20px;
}
.title {
  font-size: 1.5rem;
  margin-bottom: 16px;
  font-weight: bold;
}
</style>
