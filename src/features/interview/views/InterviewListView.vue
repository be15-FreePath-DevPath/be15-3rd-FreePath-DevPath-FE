<script setup>
import {ref, onMounted} from 'vue'
import SkeletonList from '@/components/common/SkeletonList.vue'
import PagingBar from '@/components/common/PagingBar.vue'
import InterviewList from '@/features/interview/components/InterviewList.vue'
import InterviewHeader from '@/features/interview/components/InterviewHeader.vue'
import {fetchInterviewRooms} from '@/features/interview/api.js'

const newBreadCrumbItems = ref(['모의 면접', '모의 면접 조회']);
const emit = defineEmits(['updateBreadCrumb']);

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

// 면접 목록 불러오기
const loadInterviews = async (page = 1) => {
  isLoading.value = true;
  try {
    const resp = await fetchInterviewRooms({
      page,
      sortOrder: sortOrder.value,
      category: filters.value.category,
      difficulty: filters.value.difficulty,
      evaluation: filters.value.evaluation,
    });

    const { interviewRooms, pagination: rawPagination } = resp.data.data;

    interviews.value = interviewRooms;

    pagination.value = {
      currentPage: rawPagination.currentPage,
      totalPages: rawPagination.totalPage,
      totalItems: rawPagination.totalItems ?? resp.data.data.totalInterviewRoomCount
    };

  } catch (e) {
    console.error('면접방 목록 로딩 실패', e);
  } finally {
    isLoading.value = false;
  }
};

// 필터 변경 처리
const handleFilterChange = ({type, value}) => {
  if (type === 'title') {
    filters.value.difficulty = value.difficulty
    filters.value.evaluation = value.strictness
  } else if (type === 'type') {
    filters.value.category = value.category
  }
  pagination.value.currentPage = 1
  loadInterviews(1)
}

// 정렬 변경 처리
const handleSortChange = (order) => {
  sortOrder.value = order
  pagination.value.currentPage = 1
  loadInterviews(1)
}

// 최초 로딩
onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
  loadInterviews()
})

</script>

<template>
  <div class="interview-list-view">
    <h2 class="title">면접방 목록</h2>

    <InterviewHeader
        @filter-change="handleFilterChange"
        @sort-change="handleSortChange"
    />

    <SkeletonList v-if="isLoading"/>
    <InterviewList v-else :interviews="interviews"/>

    <PagingBar
        v-bind="pagination"
        @page-changed="loadInterviews"
    />
  </div>
</template>

<style scoped>
.interview-list-view {
  padding: 20px;
}
.title {
  font-weight: bold;
  font-size: 14px;
  height: 20px;
  margin-bottom: 20px;
  margin-left: 8px;
}
</style>
