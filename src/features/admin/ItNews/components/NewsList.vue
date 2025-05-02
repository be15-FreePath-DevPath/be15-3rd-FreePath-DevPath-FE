<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import NewsItem from '@/features/admin/ItNews/components/NewsItem.vue'
// import PagingBar from '@/components/common/PagingBar.vue'
import { getNewsList } from '@/features/admin/ItNews/api.js'

const router = useRouter()

const itNews = ref([])  // 뉴스 목록을 저장하는 변수
const isLoading = ref(true)  // 로딩 상태를 관리하는 변수
const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
})

// 뉴스 목록을 가져오는 함수
const fetchNews = async (page = 1) => {
  isLoading.value = true
  try {
    const { data: wrapper } = await getNewsList({ page })
    const respData = wrapper?.data || {}

    itNews.value = respData.newsList || []
    Object.assign(pagination, respData.pagination ?? {})
  } catch (e) {
    console.error('뉴스 목록 로드 실패', e)
  } finally {
    isLoading.value = false
  }
}


// 컴포넌트가 마운트될 때 뉴스 목록을 가져오는 함수 실행
onMounted(() => fetchNews())
</script>

<template>
  <div class="container">
    <!-- 뉴스 목록을 표시하는 부분 -->
    <NewsItem v-for="news in itNews" :key="news.itNewsId" :news="news" />
  </div>

  <!-- 페이징 바 관련 부분은 주석 처리 -->
  <!--
  <PagingBar v-bind="pagination" @page-changed="fetchNews" />
  -->
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
